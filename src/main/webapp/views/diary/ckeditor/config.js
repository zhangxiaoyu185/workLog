/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	// 界面语言，默认为 'en' 
	config.language = 'zh-cn'; 
	// 设置宽高 
	config.width = 580; 
	config.height = 400; 

	// 背景颜色 
	//config.uiColor = '#cdeafa'; 
	//高亮显示
	config.extraPlugins = 'clipboard,lineutils,widget,dialog,codesnippet';
	codeSnippet_theme: 'zenburn';
	//工具栏显示
	config.toolbar = [[ 'Source', '-', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo', 'Bold',
	                    'Italic',"TextColor","Format","FontSize","Image","Link" ,"Unlink","CodeSnippet"]];
	//待会要上传的action或servlet
	//config.filebrowserImageUploadUrl= "../../../main/upload"; 
	//config.filebrowserBrowseUrl = "../../../main/upload";//'http://119.147.80.165:7778/download/zhzximg';
	
	config.filebrowserBrowseUrl = '../ckfinder/ckfinder.html';
    config.filebrowserUploadUrl = '../ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Files';
    config.filebrowserImageUploadUrl = '../ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Images';
    config.filebrowserFlashUploadUrl = '../ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Flash';
    config.filebrowserImageBrowseUrl = '../ckfinder/ckfinder.html?type=Images';
    config.filebrowserFlashBrowseUrl = '../ckfinder/ckfinder.html?type=Flashs';
	
};
