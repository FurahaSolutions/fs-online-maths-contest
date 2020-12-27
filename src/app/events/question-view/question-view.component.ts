import {Component, Input, OnInit} from '@angular/core';
import {IContestQuestion} from '../../shared/interfaces/contest-question.interface';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit {

  @Input('active-question') activeQuestion;
  @Input('item-index') itemIndex;
  @Input() question: IContestQuestion;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  constructor() { }

  ngOnInit(): void {
  }

}
