import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
    it('renders without crashing', () => {
        render(<Home />);
        expect(screen.getByText(/Finance Landing Page/i)).toBeInTheDocument();
    });
});

