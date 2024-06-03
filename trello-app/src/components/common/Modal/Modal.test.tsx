import ModalComponent from '.';
import { render, screen, fireEvent } from '@/utils/testUtils';

describe('Modal component', () => {
  const onClose = jest.fn();
  const onChange = jest.fn();

  const renderModal = () => {
    return render(
      <ModalComponent value='Ticket 1' open={true} onClose={onClose} onChange={onChange}>
        This is modal
      </ModalComponent>,
    );
  };

  it('should be matches snapshot', () => {
    const { asFragment } = renderModal();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the modal content when open', () => {
    renderModal();
    expect(screen.getByText('This is modal')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Ticket 1')).toBeInTheDocument();
  });

  it('handles input change', () => {
    renderModal();
    const input = screen.getByDisplayValue('Ticket 1');
    fireEvent.change(input, { target: { value: 'Ticket 2' } });
    expect(onChange).toHaveBeenCalled();
  });
});
