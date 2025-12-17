
import { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Bell,
  Download as DownloadIcon,
  Lightbulb,
  Shield,
  Zap
} from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <Info className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-[400px]">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          This is an informational alert with default styling.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This is a destructive alert indicating an error or warning.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert className="w-[400px] border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your account has been created successfully. Welcome aboard!
      </AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert className="w-[400px] border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400">
      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your subscription will expire in 3 days. Please renew to continue using our services.
      </AlertDescription>
    </Alert>
  ),
};

export const Error: Story = {
  render: () => (
    <Alert className="w-[400px] border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
      <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Failed to save your changes. Please check your internet connection and try again.
      </AlertDescription>
    </Alert>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <Info className="h-4 w-4" />
      <AlertDescription>
        This alert only has a description without a title.
      </AlertDescription>
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>No Icon Alert</AlertTitle>
      <AlertDescription>
        This alert doesn't have an icon, just title and description.
      </AlertDescription>
    </Alert>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Alert className="w-[500px]">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Important Update</AlertTitle>
      <AlertDescription>
        We've made significant improvements to our platform's security and performance. 
        This update includes enhanced data encryption, faster load times, and improved user 
        interface elements. Your data remains secure throughout this transition. 
        Please note that some features may be temporarily unavailable during the maintenance window 
        scheduled for tonight between 2:00 AM and 4:00 AM EST.
      </AlertDescription>
    </Alert>
  ),
};

export const Notification: Story = {
  render: () => (
    <Alert className="w-[400px] border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400">
      <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <AlertTitle>New Notification</AlertTitle>
      <AlertDescription>
        You have 3 new messages in your inbox.
      </AlertDescription>
    </Alert>
  ),
};

export const DownloadReady: Story = {
  render: () => (
    <Alert className="w-[400px] border-purple-200 bg-purple-50 text-purple-800 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-400">
      <DownloadIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
      <AlertTitle>Download Ready</AlertTitle>
      <AlertDescription>
        Your report has been generated and is ready for download.
      </AlertDescription>
    </Alert>
  ),
};

export const Tip: Story = {
  render: () => (
    <Alert className="w-[400px] border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400">
      <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertTitle>Pro Tip</AlertTitle>
      <AlertDescription>
        Use keyboard shortcuts to navigate faster. Press Ctrl+K to open the command palette.
      </AlertDescription>
    </Alert>
  ),
};

export const Security: Story = {
  render: () => (
    <Alert className="w-[400px] border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-400">
      <Shield className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
      <AlertTitle>Security Alert</AlertTitle>
      <AlertDescription>
        Two-factor authentication has been enabled for your account.
      </AlertDescription>
    </Alert>
  ),
};

export const Performance: Story = {
  render: () => (
    <Alert className="w-[400px] border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-400">
      <Zap className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
      <AlertTitle>Performance Improved</AlertTitle>
      <AlertDescription>
        Page load times have been reduced by 40% with our latest optimizations.
      </AlertDescription>
    </Alert>
  ),
};

export const MinimalAlert: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertDescription>
        Minimal alert with just a description.
      </AlertDescription>
    </Alert>
  ),
};
