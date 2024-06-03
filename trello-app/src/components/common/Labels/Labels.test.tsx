import LabelComponent from '.';
import { render, screen } from '@/utils/testUtils';

describe('Labels component', () => {
  const onChange = jest.fn();
  const onClose = jest.fn();
  const checkList = [{ label: 'red', value: 'red', checked: false, key: '2' }];

  const renderLabels = () => {
    return render(<LabelComponent onChange={onChange} checkList={checkList} onClose={onClose} />);
  };

  it('should be matches snapshot', () => {
    const { asFragment } = renderLabels();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders title and checklist', () => {
    renderLabels();

    expect(screen.getByText('Labels')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(checkList.length);
  });
});
