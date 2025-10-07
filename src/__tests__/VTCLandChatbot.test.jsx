import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VTCLandChatbot from '../components/services/VTCLandChatbot';

describe('VTCLandChatbot reservation form', () => {
  it('submitting reservation calls onExecuteReservation with data', async () => {
    const onExecuteReservation = vi.fn();
    render(<VTCLandChatbot isOpen={true} onClose={() => {}} onOpenCalculator={() => {}} onOpenCalendar={() => {}} onExecuteReservation={onExecuteReservation} />);

    // Click quick reply to open reservation form
    const quick = screen.getByText(/Je veux réserver un VTC/i);
    fireEvent.click(quick);

    const pickup = await screen.findByPlaceholderText(/Point de départ/i);
    const destination = screen.getByPlaceholderText(/Destination/i);

    fireEvent.change(pickup, { target: { value: 'Station A' } });
    fireEvent.change(destination, { target: { value: 'Station B' } });

  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) fireEvent.change(dateInput, { target: { value: '2025-10-10' } });

  const confirm = screen.getByText(/Confirmer la réservation/i);
  fireEvent.click(confirm);

    // Expect callback called (may be async)
    await waitFor(() => {
      expect(onExecuteReservation).toHaveBeenCalled();
    });
  });
});
