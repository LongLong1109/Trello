import Popover from '.';

import { render, screen, fireEvent } from '@/utils/testUtils';

describe('PopOver component', () => {
  const onOpen = jest.fn();
  const renderPopOver = () => {
    return render(
      <Popover open={true} name='Labels' onOpen={onOpen}>
        Popover Content
      </Popover>,
    );
  };

  it('renders the component with the provided props', () => {
    const { asFragment } = renderPopOver();

    expect(asFragment()).toMatchSnapshot();
  });

  it('toggles the popover on button click', () => {
    renderPopOver();

    const button = screen.getByRole('button', { name: /Labels/i });
    fireEvent.click(button);

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('displays the children inside the popover when open', () => {
    renderPopOver();

    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });
});
