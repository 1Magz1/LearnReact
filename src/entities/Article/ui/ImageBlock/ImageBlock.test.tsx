import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageBlock from './ImageBlock';
import { BookType, ImageBlockType } from '../../model/schema/articleSchema';

describe('ImageBlock component', () => {
  const mockBlockWithTitle: ImageBlockType = {
    id: '1',
    type: BookType.IMAGE,
    src: 'https://example.com/image.jpg',
    title: 'Test Image Title',
  };

  const mockBlockWithoutTitle: ImageBlockType = {
    id: '2',
    type: BookType.IMAGE,
    src: 'https://example.com/image2.jpg',
    title: '',
  };

  it('renders image with correct src and alt attributes', () => {
    render(<ImageBlock block={mockBlockWithTitle} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockBlockWithTitle.src);
    expect(image).toHaveAttribute('alt', mockBlockWithTitle.title);
  });

  it('renders title when provided', () => {
    render(<ImageBlock block={mockBlockWithTitle} />);

    expect(screen.getByText('Test Image Title')).toBeInTheDocument();
    expect(screen.getByText('Test Image Title').tagName).toBe('SPAN');
  });

  it('does not render title when not provided', () => {
    render(<ImageBlock block={mockBlockWithoutTitle} />);

    expect(screen.queryByTestId('image-caption')).toBeNull();
  });
});
