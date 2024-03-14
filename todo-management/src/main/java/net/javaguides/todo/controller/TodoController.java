package net.javaguides.todo.controller;

import lombok.AllArgsConstructor;
import net.javaguides.todo.dto.TodoDto;
import net.javaguides.todo.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("api/todos")
@AllArgsConstructor
public class TodoController {

    private TodoService todoService;

    //Build Add Todo REST API

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto){

        TodoDto savedTodo=todoService.addTodo(todoDto);

        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    //Build get Todo REST Api
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<TodoDto> getTodo(@PathVariable("id")Long  todoId){

        TodoDto todoDto=todoService.getTodo(todoId);
        return new ResponseEntity<>(todoDto,HttpStatus.OK);
    }

    //Build getAll Todo REST Api
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<TodoDto>>getAllTodos(){
       List<TodoDto> todos = todoService.getAllTodos();
       //return new ResponseEntity<>(todos,HttpStatus.OK);
        return ResponseEntity.ok(todos);
    }

    //Build Update Todo REST Api
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<TodoDto>updateTodo(@RequestBody TodoDto todoDto,@PathVariable("id") Long todoId){

        TodoDto updatedTodo=todoService.updateTodo(todoDto,todoId);
        return ResponseEntity.ok(updatedTodo);

    }

    //Build Delete Todo REST Api
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String>deleteTodo(@PathVariable("id") Long todoId){
     todoService.deleteTodo(todoId);
     return ResponseEntity.ok("Todo deleted successfully");
    }

    //Build complete Todo REST Api
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/complete")
    public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") Long todoId){
       TodoDto updatedTodo= todoService.completeTodo(todoId);
        return ResponseEntity.ok(updatedTodo);
    }

    //Build incomplete Todo REST Api
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/incomplete")
    public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable("id") Long todoId){
       TodoDto updatedTodo = todoService.inCompleteTodo(todoId);
       return ResponseEntity.ok(updatedTodo);

    }
}
