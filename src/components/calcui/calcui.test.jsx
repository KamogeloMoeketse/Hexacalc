import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, describe } from 'vitest';

import Calculatorui from './calculatorui';

describe('Hexadecimal Calculator UI', () => {
    const getDisplay = () => screen.getByTestId('display');

    test('perform subtraction correctly (F - A = 5)', async () => {
        render(<Calculatorui/>);
        await userEvent.click(screen.getByText('F'));
        await userEvent.click(screen.getByText('-'));
        await userEvent.click(screen.getByText('A'));
        await userEvent.click(screen.getByText('='));
        expect(getDisplay()).toHaveTextContent('5');
    })

    test('shows error when result would be negative (5 - A)', async () => {
        render(<Calculatorui />);
        await userEvent.click(screen.getByText('5'));
        await userEvent.click(screen.getByText('-'));
        await userEvent.click(screen.getByText('A'));
        await userEvent.click(screen.getByText('='));
        expect(getDisplay()).toHaveTextContent(/negative/i);
      });
    
      test('blocks input longer than 2 digits', async () => {
        render(<Calculatorui />);
        await userEvent.click(screen.getByText('A'));
        await userEvent.click(screen.getByText('B'));
        await userEvent.click(screen.getByText('C')); // should not register
        expect(getDisplay()).toHaveTextContent('AB');
      });
    
      test('shows error when dividing by zero', async () => {
        render(<Calculatorui />);
        await userEvent.click(screen.getByText('5'));
        await userEvent.click(screen.getByText('/'));
        await userEvent.click(screen.getByText('0'));
        await userEvent.click(screen.getByText('='));
        expect(getDisplay()).toHaveTextContent(/divide by zero/i);
      });
    
      test('resets everything when pressing C', async () => {
        render(<Calculatorui />);
        await userEvent.click(screen.getByText('A'));
        await userEvent.click(screen.getByText('+'));
        await userEvent.click(screen.getByText('B'));
        await userEvent.click(screen.getByText('Reset'));
        expect(getDisplay()).toHaveTextContent('0');
      });
    
      test('can chain operations after result (A + 1 = B + 1 = C)', async () => {
        render(<Calculatorui />);
        await userEvent.click(screen.getByText('A'));
        await userEvent.click(screen.getByText('+'));
        await userEvent.click(screen.getByText('1'));
        await userEvent.click(screen.getByText('='));
        expect(getDisplay()).toHaveTextContent('B');
        await userEvent.click(screen.getByText('+'));
        await userEvent.click(screen.getByText('1'));
        await userEvent.click(screen.getByText('='));
        expect(getDisplay()).toHaveTextContent('C');
      });    
})