import React from 'react';
import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import CodeBlock from './CodeBlock';
import { BookType, CodeBlock as CodeBlockType } from '../../model/schema/articleSchema';

describe('CodeBlock component', () => {
  const mockBlock: CodeBlockType = {
    id: '1',
    type: BookType.CODE,
    code: 'const x = 1;',
  };

  const mockClipboard = {
    writeText: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders code content correctly', () => {
    render(<CodeBlock block={mockBlock} />);

    expect(screen.getByText(mockBlock.code)).toBeInTheDocument();
    expect(screen.getByTestId('copy-button')).toBeInTheDocument();
  });

  it('copies code to clipboard on button click', () => {
    render(<CodeBlock block={mockBlock} />);

    fireEvent.click(screen.getByTestId('copy-button'));

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockBlock.code);
  });

  it('handles clipboard errors', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => null);
    mockClipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));

    render(<CodeBlock block={mockBlock} />);

    await act(async () => {
      fireEvent.click(screen.getByTestId('copy-button'));
    });

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleSpy.mockRestore();
  });
});
