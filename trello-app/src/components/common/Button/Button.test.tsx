import ButtonComponent from '.';

import { render, fireEvent, screen } from '@/utils/testUtils';

describe('Button component', () => {
  const onClick = jest.fn();
  const renderButton = () => {
    return render(<ButtonComponent name='Submit' isLoading={false} onClick={onClick} />);
  };

  it('should be matches snapshot', () => {
    const { asFragment } = renderButton();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should calls onClick when clicked', () => {
    renderButton();

    const button = screen.getByText('Submit');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
