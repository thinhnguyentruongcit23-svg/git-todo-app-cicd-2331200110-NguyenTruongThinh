const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// Mock the View because we are not testing the UI, only Controller-Model interaction.
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = [];
        controller = new Controller(service, mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        const todoText = 'Complete Lab 3';

        controller.handleAddTodo(todoText);

        const todos = service.getTodos();

        expect(todos).toHaveLength(1);
        expect(todos[0].text).toBe(todoText);
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        service.addTodo('Learn Jest');

        const todoId = service.getTodos()[0].id;

        controller.handleRemoveTodo(todoId);

        expect(service.getTodos()).toHaveLength(0);
    });
});