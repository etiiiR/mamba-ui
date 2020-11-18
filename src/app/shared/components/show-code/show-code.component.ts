import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
// eslint-disable-next-line node/no-unpublished-import
import * as Prism from 'prismjs';
import {BaseComponent} from '../base/base.component';

@Component({
	selector: 'custom-show-code',
	templateUrl: './show-code.component.html',
})
export class ShowCodeComponent extends BaseComponent implements AfterViewInit {
	@Input() language = 'html';
	@ViewChild('rawContent') rawContent!: ElementRef;
	rawCode = '';
	code = '';
	codeVisible = false;

	constructor(private el: ElementRef) {
		super();
	}

	ngAfterViewInit() {
		const content = this.rawContent.nativeElement.firstChild.innerHTML;
		const grammar = Prism.languages[this.language];
		setTimeout(() => {
			this.code = this.beautifyHTML(content);
			this.code = Prism.highlight(this.code, grammar, this.language);
		}, 0);
	}

	beautifyHTML(codeStr: string) {
		const div = document.createElement('div');
		div.innerHTML = this.removeAngularCode(codeStr).trim();
		return this.formatNode(div, 0).innerHTML.trim();
	}

	formatNode(node: any, level: number) {
		const indentBefore = level > 0 ? '\t'.repeat(level) : '';
		const indentAfter = indentBefore.substr(1);
		let textNode;

		for (let i = 0; i < node.children.length; i++) {
			level++;
			textNode = document.createTextNode('\n' + indentBefore);
			node.insertBefore(textNode, node.children[i]);

			this.formatNode(node.children[i], level);

			if (node.lastElementChild === node.children[i]) {
				textNode = document.createTextNode('\n' + indentAfter);
				node.appendChild(textNode);
			} else {
				level--;
			}
		}

		return node;
	}

	removeAngularCode(codeStr: string) {
		// removes parts that start with "_ng"
		return codeStr.replace(/\s_?ng[\w-="]+/g, '');
	}

	copyToClipboard() {
		const el = document.createElement('textarea');
		el.value = this.rawCode;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		alert('COPIED');
	}

	showPreview() {
		this.rawCode = '';
		this.codeVisible = false;
	}

	showCode() {
		this.rawCode = this.beautifyHTML(this.rawContent.nativeElement.firstChild.innerHTML);
		this.codeVisible = true;
	}
}
