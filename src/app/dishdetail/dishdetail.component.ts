import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  dishfeedbackform: FormGroup;
  dishComment: Comment;

  formErrors = {
    author: '',
    comment: '',
  };

  validationMessages = {
    author: {
      required: 'Author Name is required.',
      minlength: 'Author Name must be at least 2 characters long.',
    },
    comment: {
      required: 'Comment is required.',
    },
  };

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.dishComment = new Comment();
  }

  ngOnInit(): void {
    this.dishservice
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev =
      this.dishIds[(this.dishIds.length + (index - 1)) % this.dishIds.length];
    this.next =
      this.dishIds[(this.dishIds.length + (index + 1)) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.dishfeedbackform = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: '',
    });

    this.dishfeedbackform.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.dishfeedbackform) {
      return;
    }

    const form = this.dishfeedbackform;
    for (const field in this.formErrors) {
      (this.formErrors as any)[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = (this.validationMessages as any)[field];
        for (const key in control.errors) {
          (this.formErrors as any)[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    if (this.dishfeedbackform.value) {
      this.dishComment.author = this.dishfeedbackform.value.author;
      this.dishComment.date = new Date().toISOString();
      this.dishComment.comment = this.dishfeedbackform.value.comment;
      this.dishComment.rating = this.dishfeedbackform.value.rating;

      this.dish.comments.push(this.dishComment);
    }

    this.dishfeedbackform.reset({
      author: '',
      rating: 5,
      comment: '',
    });
  }
}
