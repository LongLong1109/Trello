import DatePickerComponent from '.';
import { render, screen, fireEvent } from '@/utils/testUtils';

describe('DatePickerComponent', () => {
  const mockDate = new Date('2024-05-23T00:00:00Z');
  const onChange = jest.fn();
  const onSave = jest.fn();
  const onRemove = jest.fn();

  const renderDatePicker = (value: Date | null) => {
    return render(
      <DatePickerComponent
        value={value}
        onChange={onChange}
        formattedDate={value ? value.toISOString().split('T')[0] : ''}
        onSave={onSave}
        onRemove={onRemove}
      />,
    );
  };

  it('should be matches snapshot', () => {
    const { asFragment } = renderDatePicker(mockDate);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with initial props', () => {
    renderDatePicker(null);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Remove' })).toBeDisabled();
  });

  it('calls onSave when Save button is clicked', () => {
    renderDatePicker(mockDate);
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);
    expect(onSave).toHaveBeenCalled();
  });

  it('calls onRemove when Remove button is clicked', () => {
    renderDatePicker(mockDate);
    const removeButton = screen.getByRole('button', { name: 'Remove' });
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalled();
  });
});
