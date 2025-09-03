import { getByRole, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import "@testing-library/jest-dom/vitest";
import type { ToDo } from "../../App";
import List from "./List";

describe('Form get text', () => {
    it('render a default form', () => {
        const arrToDo: ToDo[] = [];
        const setArrToDo = vi.fn();
        const keyShowToDO = 'all';

        render(<List arrToDo={arrToDo} setArrToDo={setArrToDo} keyShowToDO={keyShowToDO} />);
        expect(screen.getByRole('list')).toBeEmptyDOMElement();

        
    });
});