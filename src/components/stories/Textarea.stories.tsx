
import { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    rows: {
      control: 'number',
    }
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="message-2">Your message</Label>
      <Textarea 
        placeholder="Type your message here." 
        id="message-2" 
        defaultValue="This is a textarea with some default text content that demonstrates how it looks with actual content."
      />
      <p className="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="message-disabled">Message (Disabled)</Label>
      <Textarea 
        placeholder="You cannot edit this..." 
        id="message-disabled" 
        disabled
        defaultValue="This textarea is disabled and cannot be edited."
      />
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: () => {
    const [text, setText] = useState('');
    const maxLength = 200;

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          placeholder="Tell us about yourself..."
          id="bio"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={maxLength}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Maximum {maxLength} characters</span>
          <span className={text.length > maxLength * 0.9 ? "text-orange-500" : ""}>
            {text.length}/{maxLength}
          </span>
        </div>
      </div>
    );
  },
};

export const Resizable: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="resizable">Resizable Textarea</Label>
      <Textarea
        placeholder="This textarea can be resized by dragging the corner..."
        id="resizable"
        className="resize"
        rows={3}
      />
    </div>
  ),
};

export const NonResizable: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="non-resizable">Non-resizable Textarea</Label>
      <Textarea
        placeholder="This textarea cannot be resized..."
        id="non-resizable"
        className="resize-none"
        rows={4}
      />
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="small">Small (2 rows)</Label>
        <Textarea
          placeholder="Small textarea..."
          id="small"
          rows={2}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="medium">Medium (4 rows)</Label>
        <Textarea
          placeholder="Medium textarea..."
          id="medium"
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="large">Large (8 rows)</Label>
        <Textarea
          placeholder="Large textarea..."
          id="large"
          rows={8}
        />
      </div>
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="error">With Error</Label>
        <Textarea
          placeholder="This field has an error..."
          id="error"
          className="border-destructive focus-visible:ring-destructive"
        />
        <p className="text-sm text-destructive">This field is required</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="success">Success State</Label>
        <Textarea
          placeholder="This field is valid..."
          id="success"
          className="border-green-500 focus-visible:ring-green-500"
          defaultValue="This is a valid response that meets all requirements."
        />
        <p className="text-sm text-green-600">Looks good!</p>
      </div>
    </div>
  ),
};

export const CommentForm: Story = {
  render: () => {
    const [comment, setComment] = useState('');

    return (
      <div className="space-y-4 w-full max-w-md border rounded-lg p-4">
        <h3 className="font-semibold">Leave a comment</h3>
        <div className="space-y-2">
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            placeholder="Share your thoughts..."
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Be respectful and constructive.
          </p>
          <div className="space-x-2">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm" disabled={!comment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

export const FeedbackForm: Story = {
  render: () => {
    const [feedback, setFeedback] = useState('');
    const minLength = 10;

    return (
      <div className="space-y-4 w-full max-w-lg border rounded-lg p-6">
        <div className="space-y-2">
          <h3 className="font-semibold">Send us your feedback</h3>
          <p className="text-sm text-muted-foreground">
            Help us improve by sharing your thoughts and suggestions.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="feedback">Your feedback</Label>
          <Textarea
            placeholder="What would you like to tell us?"
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={5}
            className="resize-none"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Minimum {minLength} characters required</span>
            <span className={feedback.length < minLength ? "text-orange-500" : "text-green-600"}>
              {feedback.length} characters
            </span>
          </div>
        </div>
        <Button 
          className="w-full" 
          disabled={feedback.length < minLength}
        >
          Send Feedback
        </Button>
      </div>
    );
  },
};
