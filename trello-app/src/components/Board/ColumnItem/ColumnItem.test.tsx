// components
import ColumnItem from '../ColumnItem';

// utils
import { render, screen, fireEvent } from '@/utils/testUtils';

describe('ColumnItem component', () => {
  const mockOnAddList = jest.fn();
  const mockOnIsAddingList = jest.fn();
  const mockOnListName = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderColumnItem = (isAddingList: boolean, listName: string) => {
    return render(
      <ColumnItem
        isAddingList={isAddingList}
        listName={listName}
        onAddList={mockOnAddList}
        onIsAddingList={mockOnIsAddingList}
        onListName={mockOnListName}
      />,
    );
  };

  it('should be matches snapshot', () => {
    const { asFragment } = renderColumnItem(false, 'Title');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should renders the add button when isAddingList is false', () => {
    renderColumnItem(false, 'Title');

    expect(screen.getByText('Add a list')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Enter list title...')).toBeNull();
  });

  it('should call onAddList with the correct arguments and reset states', () => {
    renderColumnItem(true, 'New List');
    fireEvent.click(screen.getByText('Add List'));
    expect(mockOnAddList).toHaveBeenCalledWith('New List');
    expect(mockOnListName).toHaveBeenCalledWith('');
    expect(mockOnIsAddingList).toHaveBeenCalledWith(false);
  });

  it('should not call onAddList if the input is empty', () => {
    renderColumnItem(true, '');
    fireEvent.click(screen.getByText('Add List'));
    expect(mockOnAddList).not.toHaveBeenCalled();
  });
});
