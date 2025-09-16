import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { StatsCard, StatsCards } from '@/components/ui/StatsCards';
import { mockStatsData } from '@/test/utils';

describe('StatsCard', () => {
  const mockProps = {
    title: 'Test Metric',
    value: '1,234',
    change: 5.2,
    changeType: 'positive' as const,
    icon: <div data-testid="test-icon">Icon</div>,
    description: 'Test description'
  };

  it('renders the stats card with correct data', () => {
    render(<StatsCard {...mockProps} />);
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('5.2%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders positive change with correct styling', () => {
    render(<StatsCard {...mockProps} changeType="positive" />);
    
    const changeElement = screen.getByText('5.2%').parentElement;
    expect(changeElement).toHaveClass('text-success-600');
  });

  it('renders negative change with correct styling', () => {
    render(<StatsCard {...mockProps} changeType="negative" change={-3.1} />);
    
    const changeElement = screen.getByText('3.1%').parentElement;
    expect(changeElement).toHaveClass('text-error-600');
  });

  it('renders neutral change with correct styling', () => {
    render(<StatsCard {...mockProps} changeType="neutral" />);
    
    const changeElement = screen.getByText('5.2%').parentElement;
    expect(changeElement).toHaveClass('text-gray-600');
  });

  it('renders without description when not provided', () => {
    const propsWithoutDescription = { ...mockProps };
    delete propsWithoutDescription.description;
    
    render(<StatsCard {...propsWithoutDescription} />);
    
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });
});

describe('StatsCards', () => {
  it('renders multiple stats cards', () => {
    render(<StatsCards stats={mockStatsData} />);
    
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('2,543')).toBeInTheDocument();
    expect(screen.getByText('$45,231')).toBeInTheDocument();
  });

  it('renders with responsive grid layout', () => {
    const { container } = render(<StatsCards stats={mockStatsData} />);
    
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
  });

  it('renders empty state when no stats provided', () => {
    render(<StatsCards stats={[]} />);
    
    const gridContainer = document.querySelector('.grid');
    expect(gridContainer?.children).toHaveLength(0);
  });
});
