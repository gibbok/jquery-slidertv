<a name="SliderTV"></a>

## SliderTV : <code>object</code>
SliderTV is an easy-to-use jQuery slider plugin optimized for Smart TV apps. Use jQuery SliderTV for controlling any HTML based content in horizontal or vertical order in a carousel-like fashion.

**Kind**: global namespace  
**See**

- [README.md](../README.md) for further information.
- [Examples folder](../examples) for working examples and common settings.

**Version**: 1.0  
**Author:** GibboK  
**License**: The MIT License (MIT)  

* [SliderTV](#SliderTV) : <code>object</code>
    * [.defaults](#SliderTV.defaults) : <code>object</code>
    * [.SliderTV()](#SliderTV.SliderTV)
    * [.init()](#SliderTV.init)
    * [._getId()](#SliderTV._getId)
    * [._listen()](#SliderTV._listen)
    * [._calculateMidPoint()](#SliderTV._calculateMidPoint)
    * [._getItemDoms()](#SliderTV._getItemDoms)
    * [._setItemPositions()](#SliderTV._setItemPositions)
    * [._setFocus()](#SliderTV._setFocus)
    * [._removeFocus()](#SliderTV._removeFocus)
    * [._createBullets()](#SliderTV._createBullets)
    * [._getBullets()](#SliderTV._getBullets)
    * [._updateBullets()](#SliderTV._updateBullets)
    * [._deactiveBullets()](#SliderTV._deactiveBullets)
    * [._getNavigation()](#SliderTV._getNavigation)
    * [._showHidePrevNext()](#SliderTV._showHidePrevNext)
    * [._isItemExists()](#SliderTV._isItemExists)
    * [._moveTo()](#SliderTV._moveTo)

<a name="SliderTV.defaults"></a>

### SliderTV.defaults : <code>object</code>
Plugin's defaults are available using `$.fn.sliderTV.defaults;`.
Example: `$.fn.sliderTV.defaults.animation.easing = 'swing';`.

**Kind**: static namespace of <code>[SliderTV](#SliderTV)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| animation | <code>object</code> | The default values for the animation. |
| animation.duration | <code>number</code> | A number determining how long the animation will run. |
| animation.easing | <code>string</code> | A string indicating which easing function to use for the transition; jQuery easing values are accepted. |
| animation.isVertical | <code>string</code> | A boolean indicating if the direction of the animation is vertical or horizontal. |
| bullets | <code>object</code> | The default values for bullets. |
| bullets.canShow | <code>boolean</code> | A boolean indicating if bullets will be rendered or not. |

<a name="SliderTV.SliderTV"></a>

### SliderTV.SliderTV()
**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _id | <code>string</code> | A string indicating the slider id. |
| _midPoints | <code>number</code> | Values for slider dimensions midpoints. |
| _midPoints.x | <code>number</code> | A number indicating the horizontal center point for the slider. |
| _midPoints.y | <code>number</code> | A number indicating the vertical center point for the slider. |
| _itemDoms | <code>array</code> | DOMs references of slidable items. |
| _focus | <code>number</code> | A number indicating the index value of the focused slidable item. |
| _prevDom | <code>object</code> | A DOM reference to 'Previous' navigation element. |
| _nextDom | <code>object</code> | A DOM reference to 'Next' navigation element. |
| _canCheckMovePrevNext | <code>boolean</code> | A boolean value determining the executing of rendering navigation. |
| _isAnimationOn | <code>boolean</code> | A boolean value indicating when an animation is on going. If true interaction on Slider are allowed, otherwise not. |

<a name="SliderTV.init"></a>

### SliderTV.init()
Initialize and start sequence.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._getId"></a>

### SliderTV._getId()
Get the id for slider instance.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._listen"></a>

### SliderTV._listen()
Listening to events triggered on the slider.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._calculateMidPoint"></a>

### SliderTV._calculateMidPoint()
Calculate mid points for slider container.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._getItemDoms"></a>

### SliderTV._getItemDoms()
Get DOMs for slidable items.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._setItemPositions"></a>

### SliderTV._setItemPositions()
Set CSS position for slidable items.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._setFocus"></a>

### SliderTV._setFocus()
Set focus on slidable item.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._removeFocus"></a>

### SliderTV._removeFocus()
Remove focus from slidable item in focus.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._createBullets"></a>

### SliderTV._createBullets()
Create a bullet list based on the number and status of slidable items.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._getBullets"></a>

### SliderTV._getBullets()
Get dom for bullets container.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._updateBullets"></a>

### SliderTV._updateBullets()
Update bullets and set active one.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._deactiveBullets"></a>

### SliderTV._deactiveBullets()
Deactivate bullets.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._getNavigation"></a>

### SliderTV._getNavigation()
Get dom for navigational elements.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._showHidePrevNext"></a>

### SliderTV._showHidePrevNext()
Show or hide navigational elements.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._isItemExists"></a>

### SliderTV._isItemExists()
Check if slidable item at a specific index exists.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  
<a name="SliderTV._moveTo"></a>

### SliderTV._moveTo()
Move slidable items in order to focus target.

**Kind**: static method of <code>[SliderTV](#SliderTV)</code>  

| Type | Description |
| --- | --- |
| <code>string</code> &#124; <code>number</code> | Index target to move and focus to. Only possible values: [to=move:next] [to=move:prev] [to=number] |

