import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {IContestQuestion} from '../../shared/interfaces/contest-question.interface';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

interface IQuestionSelect {
  id: number;
  selected: number;
}

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuestionViewComponent),
      multi: true
    }
  ]
})
export class QuestionViewComponent implements OnInit, ControlValueAccessor {

  // eslint-disable-next-line
  @Input('active-question') activeQuestion;

  // eslint-disable-next-line
  @Input('item-index') itemIndex;
  @Input() question: IContestQuestion;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  choices: boolean[];
  value: IQuestionSelect;
  onChanges: (val: IQuestionSelect) => void;

  selectChoice(k) {
    this.choices.fill(false);
    this.choices[k] = true;
    this.choices = [...this.choices];

    this.value = {id: this.question.id, selected: this.question.choices[k].id};
    this.onChanges(this.value);
  }

  ngOnInit(): void {
    this.choices = Array(this.question.choices.length).fill(false);
  }

  registerOnChange(fn: (val: IQuestionSelect) => void): void {
    this.onChanges = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(value: { id: number; selected: number }): void {
    this.value = value;
  }

}
