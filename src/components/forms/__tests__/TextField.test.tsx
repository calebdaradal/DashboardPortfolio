import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { TextField } from '@/components/forms/FormFields';
import { useForm } from 'react-hook-form';

// Test wrapper component
const TestTextField = (props: any) => {
  const form = useForm({
    defaultValues: { testField: '' }
  });
  
  return (
    <form>
      <TextField form={form} name="testField" {...props} />
    </form>
  );
};

describe('TextField', () => {
  const mockProps = {
    label: 'Test Field',
    placeholder: 'Enter test value'
  };

  it('renders text field with label and placeholder', () => {
    render(<TestTextField {...mockProps} />);
    
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter test value')).toBeInTheDocument();
  });

  it('handles user input correctly', async () => {
    const user = userEvent.setup();
    
    render(<TestTextField {...mockProps} />);
    
    const input = screen.getByLabelText('Test Field');
    await user.type(input, 'test value');
    
    expect(input).toHaveValue('test value');
  });

  it('shows password toggle for password type', () => {
    render(<TestTextField {...mockProps} type="password" showPasswordToggle />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Field')).toHaveAttribute('type', 'password');
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    
    render(<TestTextField {...mockProps} type="password" showPasswordToggle />);
    
    const input = screen.getByLabelText('Test Field');
    const toggleButton = screen.getByRole('button');
    
    // Initially password type
    expect(input).toHaveAttribute('type', 'password');
    
    // Click toggle
    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    
    // Click toggle again
    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('applies disabled state correctly', () => {
    render(<TestTextField {...mockProps} disabled />);
    
    const input = screen.getByLabelText('Test Field');
    expect(input).toBeDisabled();
  });

  it('handles required field styling', () => {
    render(<TestTextField {...mockProps} required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
