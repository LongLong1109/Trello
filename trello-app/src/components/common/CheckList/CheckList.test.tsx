import CheckList from '.';
import { render, screen } from '@/utils/testUtils';

describe('CheckList component', () => {
  const onChange = jest.fn();
  const initialValues = [{ label: 'green', value: 'green', checked: false, key: '1' }];

  const renderCheckList = () => {
    return render(<CheckList items={initialValues} onItemChange={onChange} />);
  };

  it('should be matches snapshot', () => {
    const { asFragment } = renderCheckList();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders checkboxes with correct labels and states', () => {
    render(<CheckList items={initialValues} onItemChange={jest.fn()} />);

    initialValues.forEach(({ value, checked }) => {
      const checkbox = screen.getByDisplayValue(value);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeInstanceOf(HTMLInputElement);
      expect((checkbox as HTMLInputElement).checked).toBe(checked);
    });
  });
});
