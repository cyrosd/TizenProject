<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text"/>

<xsl:variable name="tab"><xsl:text>    </xsl:text></xsl:variable>
<xsl:variable name="newline"><xsl:text>
</xsl:text></xsl:variable>
<xsl:variable name="startup_page" select="//page[@startup='true']"/>

<xsl:template match="/">
<xsl:text>/*******************************************************************************
* This file was generated by Tizen Web UI Builder.
* This file will be auto-generated each and everytime you save your project.
* Do not hand edit this file.
********************************************************************************/
/**
 * @method init
 * @param {Object} event
 * @inheritdoc _app.init
 * @extends _app.init
 * @alias init
 * @member app
 */
app.init = function() {
</xsl:text>

<xsl:apply-templates select="//viewModel"/>
<xsl:apply-templates select="//dataSource"/>
<xsl:apply-templates select="//handlerInfo"/>
<xsl:apply-templates select="//updateOnStartUp"/>

<xsl:for-each select="/tizenFile/document/documentData/pageData">
    <xsl:value-of select="concat($newline, $tab, 'var new', @id, ' = new _', @id, '_page();', $newline)"/>
    <xsl:value-of select="concat($tab, 'new', @id, '.init_page();', $newline)"/>
</xsl:for-each>

<xsl:text>
};
</xsl:text>

<xsl:text>
// page classes
    
</xsl:text>
<xsl:apply-templates select="//pageData"/>

</xsl:template>

<xsl:template match="pageData">
	<xsl:variable name="page_name" select="@id"/>
	<xsl:variable name="class_name" select="concat('_', @id, '_page')"/>
	
	<xsl:value-of select="concat('/**', $newline)"/>
	<xsl:value-of select="concat('*', $tab, 'Object ' , $class_name, '()' ,$newline)"/>
	<xsl:value-of select="concat('*', $tab, '@super _page', $newline)"/>
	<xsl:value-of select="concat('*', $tab, '@constructor', $newline)"/>
	<xsl:value-of select="concat('*', $tab, '@memberOf', $class_name, $newline)"/>
	<xsl:value-of select="concat('*/', $newline)"/>
	
	<xsl:value-of select="concat('function ', $class_name, '() {', $newline, '}' , $newline)"/>
	
<xsl:text>
// inherit _page
</xsl:text>	
	<xsl:value-of select="concat($class_name,'.prototype = new _page(', '&quot;', @id, '&quot;', ');')"/>
	
<xsl:text>

// widget assist
</xsl:text>	
<xsl:for-each select=".//tizen.page//*">
	<xsl:choose>
		<xsl:when test="name() = 'event'">
		</xsl:when>
		<xsl:when test="name() = 'gotoPage'">
		</xsl:when>
		<xsl:when test="name() = 'openUrl'">
		</xsl:when>
		<xsl:otherwise>
		    <xsl:if test="@id != ''">
			    <xsl:value-of select="concat($class_name, '.prototype.', @id, ' = ')"/>
	            <xsl:value-of select="concat('undefined;', $newline)"/>
		    </xsl:if>
			
		</xsl:otherwise>
	</xsl:choose>
</xsl:for-each>

<xsl:text>
// default widget event handler
</xsl:text>

<xsl:for-each select=".//tizen.page//*">
<xsl:for-each select="@*[starts-with(name(), 'on')]">
<xsl:value-of select="concat($class_name, '.prototype.', ., ' = ')"/>
<xsl:value-of select="concat('function(event) {};', $newline)"/>
</xsl:for-each>
</xsl:for-each>	




<xsl:text>
</xsl:text>

<xsl:value-of select="concat($class_name, '.prototype.init_page = function() {', $newline)"/>
<xsl:value-of select="concat($tab, 'this._init_page(function() {', $newline)"/>
<xsl:text>
		// page object
</xsl:text>
<xsl:value-of select="concat($tab, $tab, $class_name, '.prototype.obj = document.getElementById(', $class_name, '.prototype.pageID', ');', $newline)"/>
<xsl:value-of select="concat($tab, $tab, $class_name, '.prototype.tauObj = tau.widget.Page(', $class_name, '.prototype.obj', ');', $newline)"/>

<xsl:text>
		// widget assist (real object binding)
</xsl:text>

<xsl:for-each select=".//tizen.page//*">
<xsl:choose>
<xsl:when test="name() = 'event'">
</xsl:when>
<xsl:when test="name() = 'gotoPage'">
</xsl:when>
<xsl:when test="name() = 'openUrl'">
</xsl:when>
<xsl:otherwise>
<xsl:if test="@id != ''">
    <xsl:text>
		/**
		 * @type {Element}
		 */
    </xsl:text>
<xsl:value-of select="concat($tab, $class_name, '.prototype.', @id, ' = document.getElementById(', '&quot;', @id, '&quot;', ');', $newline)"/>
</xsl:if>
</xsl:otherwise>
</xsl:choose>
</xsl:for-each>

<xsl:if test="//*[@data-bind]">
	<xsl:text>
		// data binding
    </xsl:text>
	<xsl:value-of select="concat($tab, $tab, 'ko.applyBindings(app.dm, document.getElementById(', '&quot;', $page_name, '&quot;', '));', $newline)"/>
</xsl:if>

<xsl:text>

		// bind widget event handler
</xsl:text>

 
<xsl:for-each select=".//tizen.page//*">
<xsl:if test="../@id != $page_name">
<xsl:choose>
<xsl:when test = "name() = 'event'">
    <xsl:for-each select="@*[starts-with(name(), 'on')]">
        <xsl:value-of select="concat($tab, $tab, 'tau.event.on(document.querySelectorAll(', '&quot;', '&#35;', ../../@id, '&quot;', '), ')"/>
        <xsl:value-of select="concat('&quot;', substring(name(), 3), '&quot;, ', 'function(event) { ', $class_name, '.prototype.', ., '(event); });', $newline)"/>
    </xsl:for-each>
</xsl:when>
<xsl:when test = "name() = 'gotoPage'">
    <xsl:value-of select="concat($tab, $tab, 'tau.event.on(document.querySelectorAll(', '&quot;', '&#35;', ../@id, '&quot;', '), ')"/>
    <xsl:choose>
    	<xsl:when test="@reverse = 'true' or @reverse = 'false' ">
    		<xsl:value-of select="concat('&quot;', substring(@event, 3), '&quot;, ', 'function(event) { ', $class_name, '.prototype.changePage(document.getElementById(', '&quot;', @destinationPage, '&quot;', '), {transition :', '&quot;', @transition,'&quot;', ', reverse : ', @reverse, '}); });', $newline)"/>
    	</xsl:when>
    	<xsl:otherwise>
    		<xsl:value-of select="concat('&quot;', substring(@event, 3), '&quot;, ', 'function(event) { ', $class_name, '.prototype.changePage(document.getElementById(', '&quot;', @destinationPage, '&quot;', '), {transition :', '&quot;', @transition,'&quot;', '}); });', $newline)"/>
    	</xsl:otherwise>
    </xsl:choose>
</xsl:when>
<xsl:when test = "name() = 'openUrl'">
    <xsl:value-of select="concat($tab, $tab, 'tau.event.on(document.querySelectorAll(', '&quot;', '&#35;', ../@id, '&quot;', '), ')"/>
    <xsl:value-of select="concat('&quot;', substring(@event, 3), '&quot;, ', 'function(event) { window.location.href = ', '&quot;', @url, '&quot;', '; });', $newline)"/>
</xsl:when>
<xsl:when test = "name() = 'animation'">
    <xsl:value-of select="concat($tab, $tab, 'tau.event.on(document.querySelectorAll(', '&quot;', '&#35;', ../@id, '&quot;', '), ')"/>
    <xsl:value-of select="concat('&quot;', substring(@event, 3), '&quot;, ', 'function(event) {')"/>
    <xsl:choose>
        <xsl:when test = "@type = 'play'">
            <xsl:value-of select="concat(' AniPlay.playAniGroupsById(', '&quot;', $page_name, '&quot;, ' , '&quot;', @animationGroup, '&quot;', ');')"/>
        </xsl:when>
        <xsl:when test = "@type = 'pause'">
            <xsl:value-of select="concat(' AniPlay.pauseAniGroupsById(', '&quot;', $page_name, '&quot;, ' , '&quot;', @animationGroup, '&quot;', ');')"/>
        </xsl:when>
        <xsl:when test = "@type = 'go_to_time'">
            <xsl:value-of select="concat(' AniPlay.setCurrentTime(', @time, ',', '&quot;', @animationGroup, '&quot;', ');')"/>
        </xsl:when>
            <xsl:when test = "@type = 'stop'">
            <xsl:value-of select="concat(' AniPlay.stopAniGroupsById(', '&quot;', $page_name, '&quot;, ' , '&quot;', @animationGroup, '&quot;', ');')"/>
        </xsl:when>
    </xsl:choose>
<xsl:value-of select ="concat(' });', $newline)"/>
</xsl:when>
</xsl:choose>
</xsl:if>
</xsl:for-each>


<xsl:value-of select="concat($newline, $tab, '});', $newline, $newline)"/>

<xsl:if test=".//tizen.page//*[@data-bind]">
	<xsl:value-of select="concat($tab, 'this._remove_page(function (event) {', $newline)"/>
	<xsl:value-of select="concat($tab, $tab, 'ko.unapplyBindings($(', '&quot;', '#', $page_name, '&quot;', '));', $newline)"/>
	<xsl:value-of select="concat($tab, '});', $newline)"/>
</xsl:if>

<xsl:text>
};
</xsl:text>



    
</xsl:template>

<xsl:template match="dataSource">
	<xsl:variable name="dataModel_name" select="@dataSource"/>
	<xsl:variable name="newDataSource" select="concat($tab, 'app.ds.', $dataModel_name, ' = new uibinding.')"/>
		
	<xsl:choose>
	    <xsl:when test="@modelType = 'Empty'">
	        <xsl:value-of select="concat($newDataSource, 'dataSource({', $newline)" />
            <xsl:value-of select="concat($tab, '});', $newline)"/>
	    </xsl:when>
		<xsl:when test="@modelType = 'Remote Call'">
			<xsl:value-of select="concat($newDataSource, 'dataSourceRemote', '({', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'url: ', '&quot;', @url, '&quot;', ',', $newline)" disable-output-escaping="yes"/>
			<xsl:value-of select="concat($tab, $tab, 'method: ', '&quot;', @type, '&quot;', ',', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'proxy: ', '&quot;', @proxy, '&quot;', ',', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'dataType: ', '&quot;', @dataType, '&quot;', ',', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'timeout: ', '&quot;', @timeout, '&quot;', ',', $newline)"/>
			<xsl:if test="@query != ''">
				<xsl:value-of select="concat($tab, $tab, 'query: {', $newline)"/>
				<xsl:call-template name="splitQuery">
					<xsl:with-param name="stringtosplit" select ="@query" />
				</xsl:call-template>
				<xsl:value-of select="concat($tab, $tab, '},', $newline)"/>
			</xsl:if>
			<xsl:if test="@headers != ''">
				<xsl:value-of select="concat($tab, $tab, 'headers: {', $newline)"/>
				<xsl:call-template name="splitQuery">
					<xsl:with-param name="stringtosplit" select ="@headers" />
				</xsl:call-template>
				<xsl:value-of select="concat($tab, $tab, '},', $newline)"/>
			</xsl:if>	
			<xsl:value-of select="concat($tab, '});', $newline)"/>
		</xsl:when>
		<xsl:when test="@modelType = 'Static'">
			<xsl:value-of select="concat($newDataSource, 'dataSourceStatic', '({', $newline)"/>
			<xsl:if test="@dataType = 'json'">
				<xsl:value-of select="concat($tab, $tab, 'data: ', @jsonData, ',', $newline)" disable-output-escaping="yes"/>
			</xsl:if>
			<xsl:if test="@dataType = 'xml'">
				<xsl:value-of select="concat($tab, $tab, 'data: ', '&quot;', @jsonData, '&quot;', ',', $newline)" disable-output-escaping="yes"/>
			</xsl:if>
			<xsl:value-of select="concat($tab, $tab, 'dataType: ', '&quot;', @dataType, '&quot;', $newline)"/>
		    <xsl:value-of select="concat($tab, '});', $newline)"/> 		
		</xsl:when>
		<xsl:when test="@modelType = 'Contact'">
			<xsl:value-of select="concat($newDataSource, 'dataSourceContact', '({', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'method: ', '&quot;', @method, '&quot;')"/>
			<xsl:choose>
    			<xsl:when test="@addressBookId = ''">
        			<xsl:value-of select="$newline"/>
    			</xsl:when>
    			<xsl:otherwise>
        			<xsl:value-of select="concat(',', $newline, $tab, $tab, 'addressBookId: ', '&quot;', @addressBookId, '&quot;', $newline)"/>
    			</xsl:otherwise>
			</xsl:choose>
		    <xsl:value-of select="concat($tab, '});', $newline)"/> 		
		</xsl:when>
		<xsl:when test="@modelType = 'Calendar'">
			<xsl:value-of select="concat($newDataSource, 'dataSourceCalendar', '({', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'method: ', '&quot;', @method, '&quot;', ',', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'calendarType: ', '&quot;', @calendarType, '&quot;')"/>
			<xsl:choose>
    			<xsl:when test="@calendarId = ''">
        			<xsl:value-of select="$newline"/>
    			</xsl:when>
    			<xsl:otherwise>
        			<xsl:value-of select="concat(',', $newline, $tab, $tab, 'calendarId: ', '&quot;', @calendarId, '&quot;', $newline)"/>
    			</xsl:otherwise>
			</xsl:choose>
		    <xsl:value-of select="concat($tab, '});', $newline)"/> 		
		</xsl:when>
		<xsl:when test="@modelType = 'Call History'">
			<xsl:value-of select="concat($newDataSource, 'dataSourceCallhistory', '({', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'type: ', '&quot;', @type, '&quot;', ',', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'direction: ', '&quot;', @direction, '&quot;', ',', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'starttimeorder: ', '&quot;', @starttimeorder, '&quot;', $newline)"/>
		    <xsl:value-of select="concat($tab, '});', $newline)"/> 		
		</xsl:when>
		<xsl:when test="@modelType = 'File System'">
			<xsl:value-of select="concat($newDataSource, 'dataSourceFile', '({', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'path: ', '&quot;', @filePath, '&quot;', ',', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'dataType: ', '&quot;', @dataType, '&quot;', $newline)"/>
		    <xsl:value-of select="concat($tab, '});', $newline)"/> 		
		</xsl:when>
	</xsl:choose>
</xsl:template>
 
<xsl:template match="viewModel">
	<xsl:variable name="viewModelName" select="@name"/>
	<xsl:variable name="dataSourceName" select="@dataSource"/>
	
<!--	
	<xsl:value-of select="concat($tab, 'app.dm.', $viewModelName, ' = {', $newline)"/>
	<xsl:value-of select="concat($tab, $tab, 'viewModel: function (obj) {', $newline)"/>
	<xsl:value-of select="concat($tab, $tab, $tab, 'var _self = this;', $newline)"/>
     
	<xsl:apply-templates select="observableObject" mode="origin"/>     

    <xsl:value-of select="concat($tab, $tab, $tab, 'return _self;', $newline)"/>
    <xsl:value-of select="concat($tab, $tab, '}', $newline)"/> 		
    <xsl:value-of select="concat($tab, '};', $newline)"/>
-->

	<xsl:value-of select="concat($tab, 'app.dm.', $viewModelName, ' = new uibinding.dataModel({', $newline)"/>
	<xsl:apply-templates select="observableObject" mode="fake"/>
	<xsl:value-of select="concat($tab, '});', $newline)"/>
	
	
</xsl:template>

<xsl:template match="handlerInfo">
	<xsl:variable name="dataSourceName" select="@name"/>
	
	<xsl:value-of select="concat($tab, 'app.ds.', $dataSourceName, '.addHandler(', '&quot;', 'success', '&quot;', ', function() {', $newline)"/>
	<xsl:value-of select="concat($tab, $tab, 'var ', $dataSourceName, '= app.ds.', $dataSourceName, ';', $newline)"/>
	<xsl:for-each select="modelInfo">
		<xsl:value-of select="concat($tab, $tab, 'var ', @name, '= app.dm.', @name, ';', $newline)"/>
		<xsl:value-of select="concat($tab, $tab, 'ko.mapping.fromJS(', $dataSourceName, '.data', ', ',@name,');', $newline)"/>
	</xsl:for-each> 		
	<xsl:value-of select="concat($tab, '});', $newline)"/>
</xsl:template>

<xsl:template match="observableObject" mode="fake">
	<xsl:choose>
		<xsl:when test="@type = 'Array'">
			<xsl:value-of select="concat($tab, $tab, '&quot;', @name, '&quot;', ': [{', $newline)"/>
			<xsl:apply-templates select="observableObject" mode="fake"/>
			<xsl:value-of select="concat($tab, $tab, '}],', $newline)"/>
		</xsl:when>
		<xsl:when test="@type = 'Object'">
			<xsl:value-of select="concat($tab, $tab, '&quot;', @name, '&quot;', ': {', $newline)"/>
			<xsl:apply-templates select="observableObject" mode="fake"/>
			<xsl:value-of select="concat($tab, $tab, '},', $newline)"/>						
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="concat($tab, $tab, '&quot;', @name, '&quot;', ': ', '&quot;', '&quot;', ',', $newline)"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="observableObject" mode="origin">
	<xsl:choose>
		<xsl:when test="@type = 'Array'">
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, '_self.', '_', @name, ' = function(obj) {', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, $tab, 'var _self = this;', $newline)"/>
			<xsl:apply-templates select="observableObject" mode="origin"/>
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, '};', $newline)"/>
			
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, '_self.', @name, ' = ko.observableArray();', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, 'for (var i = 0, j = (obj.', @name, '?obj.', @name,'.length:0); i ', '&lt;', ' j; i++) {',$newline)" disable-output-escaping="yes"/>
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, $tab, 'var _obj = obj.',@name,'[i];', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, $tab, '_self.', @name, '.push(new _self._', @name, '(_obj));', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, '}', $newline)"/>
		</xsl:when>
		<xsl:when test="@type = 'Object'">
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, '_self.', '_', @name, ' = function(obj) {', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, $tab, 'var _self = this;', $newline)"/>
			<xsl:apply-templates select="observableObject" mode="origin"/>
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, '};', $newline)"/>
			
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, '_self.', @name, ' = ko.observable(new _self._', @name, '(obj.', @name, '));', $newline)"/>
			
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="concat($tab, $tab, $tab, $tab, '_self.', @name, ' = ko.observable(obj.', @name,');', $newline)"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="splitQuery">
	<xsl:param name="stringtosplit" />
	<xsl:variable name="first" select="substring-before($stringtosplit, '&amp;')" />
    <xsl:variable name="remaining" select="substring-after($stringtosplit, '&amp;')" />
 
	<xsl:choose>
		<xsl:when test="$first = ''">
			<xsl:if test="$stringtosplit">
				<xsl:variable name="key" select="substring-before($stringtosplit, '=')" />
	    		<xsl:variable name="value" select="substring-after($stringtosplit, '=')" />
	    		<xsl:value-of select="concat($tab, $tab, $tab, $key,': ', '&quot;', $value, '&quot;', ',', $newline)"/>
			</xsl:if>
		</xsl:when>
		<xsl:otherwise>
			<xsl:variable name="key" select="substring-before($first, '=')" />
    		<xsl:variable name="value" select="substring-after($first, '=')" />
			<xsl:value-of select="concat($tab, $tab, $tab, $key,': ', '&quot;', $value, '&quot;', ',', $newline)"/>
		</xsl:otherwise>
	</xsl:choose>	

    <xsl:if test="$remaining">
      <xsl:call-template name="splitQuery">
        <xsl:with-param name="stringtosplit" select="$remaining" />
      </xsl:call-template>
    </xsl:if>	
</xsl:template>

<xsl:template match="updateOnStartUp">
	<xsl:value-of select="concat($tab, 'app.ds.', @name, '.update();', $newline)"/>	
</xsl:template>

<!-- 
<xsl:template match="viewModel">
	<xsl:variable name="viewModelName" select="@name"/>
	<xsl:variable name="dataSourceName" select="@dataSource"/>
	
	<xsl:value-of select="concat($tab, '$.bindingSpace.dm.', $viewModelName, ' = {', $newline)"/>
	<xsl:for-each select=".//observableObject">
		<xsl:variable name="observableObject_value" select="concat('&quot;', @value, '&quot;')"/>
		<xsl:choose>
			<xsl:when test="@type = 'Array'">
				<xsl:value-of select="concat($tab, $tab, @name, ': ko.observableArray(),', $newline)"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="concat($tab, $tab, @name, ': ko.observable(),', $newline)"/>
			</xsl:otherwise>
		</xsl:choose>
    </xsl:for-each> 		
    <xsl:value-of select="concat($tab, '};', $newline)"/>


	<xsl:choose>
		<xsl:when test="$dataSourceName != ''">
		    <xsl:value-of select="concat($tab, '$.bindingSpace.ds.', @name, '.addHandler(', '&quot;', 'successcallback', '&quot;', ', ' ,'function() {', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'var data = $.bindingSpace.ds.', $dataSourceName, '.data;', $newline)"/>
			<xsl:value-of select="concat($tab, $tab, 'var ',  @name, ' = $.bindingSpace.dm.', @name, ';', $newline)"/>
			<xsl:for-each select=".//observableObject">
				<xsl:value-of select="concat($tab, $tab, $viewModelName,'.',@name, '(', $dataSourceName,'.',@name, ');', $newline)"/>
    		</xsl:for-each>		 		
    		<xsl:value-of select="concat($tab, '});', $newline)"/>
		</xsl:when>
	</xsl:choose>

</xsl:template>
 -->

</xsl:stylesheet>