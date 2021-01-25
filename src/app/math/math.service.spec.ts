import {TestBed} from '@angular/core/testing';

import {MathService} from './math.service';
import createSpyObj = jasmine.createSpyObj;


describe('MathService', () => {
  let service: MathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('function render()', () => {

    it('should set innerHTML to "" if no value is provided', () => {

      window.MathJax = createSpyObj<typeof MathJax>([], ['Hub']);
      const htmlElement = createSpyObj<HTMLElement>([], ['innerHTML']);
      service.render(htmlElement);
      expect(htmlElement.innerText).toBe('');
    });

    it('should set innerHTML to "" if no value is provided', () => {

      window.MathJax = createSpyObj<typeof MathJax>([], ['Hub']);
      const htmlElement = createSpyObj<HTMLElement>([], ['innerText']);
      service.render(htmlElement, {});
      expect(htmlElement.innerHTML).toBe('');
    });

    it('should set innerHTML when mathml is provided', () => {
      window.MathJax = createSpyObj<typeof MathJax>([], ['Hub']);
      const htmlElement = createSpyObj<HTMLElement>([], ['innerText']);
      service.render(htmlElement, {mathml: '<p>Some latex Text</p>'});
      expect(htmlElement.innerHTML).toBe('<p>Some latex Text</p>');
    });

    it('should set innerText when latex is provided', () => {
      window.MathJax = createSpyObj<typeof MathJax>([], ['Hub']);
      const htmlElement = createSpyObj<HTMLElement>([], ['innerHTML']);
      service.render(htmlElement, {latex: 'Some latex Text'});
      expect(htmlElement.innerText).toBe('Some latex Text');
    });
  });
});
