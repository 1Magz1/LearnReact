import React from 'react';
import { render, screen } from '@testing-library/react';
import TextBlock from './TextBlock';
import { BookType, TextBlockType } from '../../model/schema/articleSchema';

describe('TextBlock component', () => {
  const mockBlock: TextBlockType = {
    id: '1',
    type: BookType.TEXT,
    title: 'Test Title',
    paragraphs: [
      'First paragraph',
      'Second paragraph',
      'Third paragraph',
    ],
  };

  it('renders correctly with title and paragraphs', () => {
    render(<TextBlock block={mockBlock} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Title').tagName).toBe('H3');

    mockBlock.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
      expect(screen.getByText(paragraph).tagName).toBe('P');
    });
  });
});
