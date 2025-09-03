import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe('Form get text', () => {
    it('render use to add a new todo', async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.type(screen.getByRole('textbox'), 'Buy milk{enter}');

        expect(screen.getByText('Buy milk')).toBeInTheDocument();
    });

});