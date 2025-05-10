import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './components/Auth/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

// Mock components that load external resources
jest.mock('./components/Movie/MovieGrid', () => () => (
  <div data-testid="mock-movie-grid">MovieGrid</div>
));

jest.mock('./components/Navigation/Header', () => () => (
    <header data-testid="mock-header">MovieExplorer</header>
));
  
describe('App Component', () => {
  const renderApp = () => {
    return render(
      <AuthProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </AuthProvider>
    );
  };

  it('renders without crashing', () => {
    renderApp();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    renderApp();
    expect(screen.getByTestId('mock-movie-grid')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = renderApp();
    expect(asFragment()).toMatchSnapshot();
  });

  it('contains theme toggle button', () => {
    renderApp();
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });
});

// Integration test example
describe('App Integration', () => {
  it('maintains context providers', () => {
    render(
      <AuthProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    expect(screen.getByTestId('mock-header')).toHaveTextContent('MovieExplorer');
  });
});