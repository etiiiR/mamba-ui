import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '@shared/components/base/base.component';

@Component({
	selector: 'custom-call-to-action-showcase',
	templateUrl: './call-to-action-showcase.component.html',
})
export class CallToActionShowcaseComponent
	extends BaseComponent
	implements OnInit {
	constructor() {
		super();
	}

	ngOnInit() {}
}
