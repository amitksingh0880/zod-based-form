
import { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: { 
      control: 'select', 
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] 
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    }
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="space-y-2">
        <Label htmlFor="text">Text Input</Label>
        <Input id="text" type="text" placeholder="Enter text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Input</Label>
        <Input id="email" type="email" placeholder="Enter email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password Input</Label>
        <Input id="password" type="password" placeholder="Enter password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="number">Number Input</Label>
        <Input id="number" type="number" placeholder="Enter number" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tel">Phone Input</Label>
        <Input id="tel" type="tel" placeholder="Enter phone number" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="url">URL Input</Label>
        <Input id="url" type="url" placeholder="Enter URL" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="search">Search Input</Label>
        <Input id="search" type="search" placeholder="Search..." />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="space-y-2">
        <Label htmlFor="search-icon">Search with Icon</Label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-icon"
            placeholder="Search..."
            className="pl-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="user-icon">Username with Icon</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="user-icon"
            placeholder="Username"
            className="pl-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-icon">Email with Icon</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email-icon"
            type="email"
            placeholder="Email"
            className="pl-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone-icon">Phone with Icon</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone-icon"
            type="tel"
            placeholder="Phone number"
            className="pl-10"
          />
        </div>
      </div>
    </div>
  ),
};

export const PasswordWithToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="space-y-2 w-[300px]">
        <Label htmlFor="password-toggle">Password with Toggle</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password-toggle"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="pl-10 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="space-y-2">
        <Label htmlFor="normal">Normal</Label>
        <Input id="normal" placeholder="Normal input" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" placeholder="Disabled input" disabled />
      </div>
      <div className="space-y-2">
        <Label htmlFor="readonly">Read Only</Label>
        <Input id="readonly" value="Read only value" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="error">With Error (styled)</Label>
        <Input 
          id="error" 
          placeholder="Error input" 
          className="border-destructive focus-visible:ring-destructive"
        />
        <p className="text-sm text-destructive">This field is required</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="success">Success (styled)</Label>
        <Input 
          id="success" 
          placeholder="Success input" 
          className="border-green-500 focus-visible:ring-green-500"
        />
        <p className="text-sm text-green-600">Input is valid</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="space-y-2">
        <Label htmlFor="small">Small</Label>
        <Input 
          id="small" 
          placeholder="Small input" 
          className="h-8 text-xs"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="default-size">Default</Label>
        <Input id="default-size" placeholder="Default input" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="large">Large</Label>
        <Input 
          id="large" 
          placeholder="Large input" 
          className="h-12 text-lg"
        />
      </div>
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="space-y-4 w-[350px]">
      <div className="space-y-2">
        <Label htmlFor="search-button">Search with Button</Label>
        <div className="flex">
          <Input
            id="search-button"
            placeholder="Search..."
            className="rounded-r-none"
          />
          <Button type="button" className="rounded-l-none">
            Search
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-subscribe">Email Subscription</Label>
        <div className="flex">
          <Input
            id="email-subscribe"
            type="email"
            placeholder="Enter your email"
            className="rounded-r-none"
          />
          <Button type="button" className="rounded-l-none">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const Validation: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const isEmailValid = email.includes('@') && email.includes('.');
    const isPasswordValid = password.length >= 8;

    return (
      <div className="space-y-4 w-[300px]">
        <div className="space-y-2">
          <Label htmlFor="email-validation">Email</Label>
          <Input
            id="email-validation"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={email && !isEmailValid ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {email && !isEmailValid && (
            <p className="text-sm text-destructive">Please enter a valid email address</p>
          )}
          {email && isEmailValid && (
            <p className="text-sm text-green-600">Email looks good!</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password-validation">Password</Label>
          <Input
            id="password-validation"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={password && !isPasswordValid ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {password && !isPasswordValid && (
            <p className="text-sm text-destructive">Password must be at least 8 characters</p>
          )}
          {password && isPasswordValid && (
            <p className="text-sm text-green-600">Password meets requirements</p>
          )}
          <p className="text-xs text-muted-foreground">
            Password must be at least 8 characters long
          </p>
        </div>
      </div>
    );
  },
};

export const File: Story = {
  args: {
    type: 'file',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};
