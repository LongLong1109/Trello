import InputComponent from '.';

import { render } from '@/utils/testUtils';

describe('Input component', () => {
  const onChange = jest.fn();
  const renderInput = () => {
    return render(
      <InputComponent value='' placeholder='Email' pointer={true} onChange={onChange} />,
    );
  };

  it('should be matches snapshot', () => {
    const { asFragment } = renderInput();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly props', () => {
    const { getByPlaceholderText } = renderInput();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
  });
});
