import CardDetail, { CardDetailProps } from '.';
import { render, screen, fireEvent } from '@/utils/testUtils';

const mockProps: CardDetailProps = {
  labels: ['blue', 'red'],
  description: 'Sample description',
  checkList: [{ label: 'Check item 1', checked: false, value: '', key: '1' }],
  dueDate: new Date('2024-05-27'),
  isOpenLabel: false,
  isOpenDate: false,
  formattedDate: 'May 27, 2024',
  isEditingDescription: false,
  comments: 'Sample comment',
  isEditComment: false,
  isOpenRemoveCard: false,
  onEditComment: jest.fn(),
  onEditingDescription: jest.fn(),
  onUpdateComment: jest.fn(),
  onOpenLabel: jest.fn(),
  onOpenDate: jest.fn(),
  onUpdateDescription: jest.fn(),
  onUpdateLabels: jest.fn(),
  onUpdateDueDate: jest.fn(),
  onSaveDate: jest.fn(),
  onRemoveDate: jest.fn(),
  onOpenRemoveCard: jest.fn(),
  onRemoveCard: jest.fn(),
};

const renderCardDetailProps = () => {
  return render(<CardDetail {...mockProps} />);
};

describe('<CardDetail />', () => {
  it('should be matches snapshot', () => {
    const { asFragment } = renderCardDetailProps();
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays labels and description correctly', () => {
    renderCardDetailProps();
    expect(screen.getByText('Sample description')).toBeInTheDocument();
  });

  it('allows editing description when clicked', () => {
    renderCardDetailProps();
    fireEvent.click(screen.getByText('Sample description'));
    expect(mockProps.onEditingDescription).toHaveBeenCalledWith(true);
  });

  it('toggles label popover', () => {
    renderCardDetailProps();
    const labelButton = screen.getAllByText('Labels');
    fireEvent.click(labelButton[1]);
    expect(mockProps.onOpenLabel).toHaveBeenCalledWith(true);
  });

  it('handles remove card action correctly', () => {
    renderCardDetailProps();
    const removeButton = screen.getByText('Remove Card');
    fireEvent.click(removeButton);
    expect(mockProps.onRemoveCard).toHaveBeenCalled();
  });
});
