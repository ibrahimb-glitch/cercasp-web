import { render, screen } from '@testing-library/react'
import Hero from '../../../apps/web/components/Hero'

test('renders hero', () => {
  render(<Hero />)
  expect(screen.getByText('Bienvenido a CERCASP')).toBeInTheDocument()
})