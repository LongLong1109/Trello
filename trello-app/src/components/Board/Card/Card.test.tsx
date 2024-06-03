// component
import Card from '.';

// interface
import { Task } from '@/interfaces/Task';

// utils
import { render, screen, fireEvent } from '@/utils/testUtils';

describe('Card component', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    labels: ['Label1', 'Label2'],
    description: 'This is a test task description',
    dueDate: new Date('2023-12-31'),
  };

  const mockOnDragStart = jest.fn();
  const mockOnOpenCard = jest.fn();

  const renderTaskCard = () => {
    return render(
      <Card task={mockTask} onDragStart={mockOnDragStart} onOpenCard={mockOnOpenCard} />,
    );
  };

  it('should be matches snapshot', () => {
    const { asFragment } = renderTaskCard();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the task card with correct content', () => {
    renderTaskCard();

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Label1, Label2')).toBeInTheDocument();
    expect(screen.getByText('This is a test task description')).toBeInTheDocument();
    expect(screen.getByText('12/31/2023')).toBeInTheDocument();
  });

  it('should call onDragStart with the correct arguments', () => {
    renderTaskCard();
    const card = screen.getByTestId('card-id');
    fireEvent.dragStart(card);

    expect(mockOnDragStart).toHaveBeenCalledTimes(1);
    expect(mockOnDragStart).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  it('should call onClick with the correct arguments', () => {
    renderTaskCard();
    const card = screen.getByTestId('card-id');
    fireEvent.click(card);

    expect(mockOnOpenCard).toHaveBeenCalledTimes(1);
  });
});
