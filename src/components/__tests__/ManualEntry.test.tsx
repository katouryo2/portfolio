import { render, screen, fireEvent } from '@testing-library/react';
import { ManualEntry } from '../ManualEntry';

describe('ManualEntry', () => {
  it('名前とカロリーが未入力で送信ボタンが無効', () => {
    render(<ManualEntry selectedMeal="breakfast" onAdd={vi.fn()} onClose={vi.fn()} />);

    expect(screen.getByRole('button', { name: /朝食に追加/ })).toBeDisabled();
  });

  it('名前とカロリーを入力すると送信ボタンが有効になる', () => {
    render(<ManualEntry selectedMeal="breakfast" onAdd={vi.fn()} onClose={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText('例: おにぎり（鮭）'), {
      target: { value: 'おにぎり' },
    });
    fireEvent.change(screen.getAllByPlaceholderText('0')[0], {
      target: { value: '180' },
    });

    expect(screen.getByRole('button', { name: /朝食に追加/ })).toBeEnabled();
  });

  it('フォーム送信で onAdd が正しい引数で呼ばれる', () => {
    const onAdd = vi.fn();
    const onClose = vi.fn();
    render(<ManualEntry selectedMeal="lunch" onAdd={onAdd} onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText('例: おにぎり（鮭）'), {
      target: { value: 'サラダ' },
    });
    fireEvent.change(screen.getAllByPlaceholderText('0')[0], {
      target: { value: '50' },
    });

    fireEvent.click(screen.getByRole('button', { name: /昼食に追加/ }));

    expect(onAdd).toHaveBeenCalledWith(
      'lunch',
      expect.objectContaining({
        name: 'サラダ',
        calories: 50,
        id: expect.any(String),
      }),
    );
    expect(onClose).toHaveBeenCalled();
  });

  it('閉じるボタンで onClose が呼ばれる', () => {
    const onClose = vi.fn();
    render(<ManualEntry selectedMeal="breakfast" onAdd={vi.fn()} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: '閉じる' }));

    expect(onClose).toHaveBeenCalled();
  });
});
