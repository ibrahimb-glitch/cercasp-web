import { render, screen } from '@testing-library/react'
import PIPC from '../../../apps/web/components/PIPC'

test('renders PIPC', () => {
  render(<PIPC />)
  expect(screen.getByText('PIPC')).toBeInTheDocument()
})