<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text" encoding="utf-8"/>
<xsl:template name="pre_animation">
<xsl:text>
        // pre-defined animation
</xsl:text>
<!-- 
    <xsl:call-template name="create_bind_function">
    <xsl:with-param name="page_id" select="'page_id'"/>
    <xsl:with-param name="widget_id" select="'widget_id'"/>
    <xsl:with-param name="event_name" select="'event_name'"/>
    <xsl:with-param name="function" select="'function'"/>
</xsl:call-template>
 -->
</xsl:template>

<xsl:template name="post_animation">
<xsl:text>
        // post-defined animation
</xsl:text>
</xsl:template>
</xsl:stylesheet>