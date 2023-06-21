
const HistoryType =
{
	Beginning:                  {id:  0, name: "Beginning",                 actions: []},
	
	ProjectOpen:                {id:  1, name: "Project Open",              actions: ["historyProjectOpen"]},
	ProjectImport:              {id:  2, name: "Project Import",            actions: ["historyProjectOpen"]},
	
	TextDrawCreate:             {id:  3, name: "TextDraw Create",           actions: ["historyTextDrawCreate"]},
	TextDrawDuplicate:          {id:  4, name: "TextDraw Duplicate",        actions: ["historyTextDrawDuplicate"]},
	TextDrawFromAnotherPoject:  {id:  5, name: "TextDraw Duplicate *",      actions: ["historyTextDrawFromAnotherPoject"]},
	TextDrawRemove:             {id:  6, name: "TextDraw Remove",           actions: ["historyTextDrawRemove"]},
	TextDrawSort:               {id:  7, name: "TextDraw Sort",             actions: ["historyTextDrawSort"]},
	TextDrawName:               {id:  8, name: "TextDraw Name",             actions: ["name"]},
	TextDrawText:               {id:  9, name: "TextDraw Text",             actions: ["text"]},
	TextDrawPosition:           {id: 10, name: "TextDraw Position",         actions: ["x", "y"]},
	TextDrawLetterSize:         {id: 11, name: "TextDraw Letter Size",      actions: ["letterSizeX", "letterSizeY"]},
	TextDrawTextSize:           {id: 12, name: "TextDraw Text Size",        actions: ["textSizeX", "textSizeY"]},
	TextDrawAlignment:          {id: 13, name: "TextDraw Alignment",        actions: ["historyAlignment"]},
	TextDrawColor:              {id: 14, name: "TextDraw Color",            actions: ["color"]},
	TextDrawUseBox:             {id: 15, name: "TextDraw Use Box",          actions: ["useBox"]},
	TextDrawBoxColor:           {id: 16, name: "TextDraw Box Color",        actions: ["boxColor"]},
	TextDrawSetShadow:          {id: 17, name: "TextDraw Set Shadow",       actions: ["setShadow"]},
	TextDrawSetOutline:         {id: 18, name: "TextDraw Set Outline",      actions: ["setOutline"]},
	TextDrawBackgroundColor:    {id: 19, name: "TextDraw Background Color", actions: ["backgroundColor"]},
	TextDrawFont:               {id: 20, name: "TextDraw Font",             actions: ["historyFont"]},
	TextDrawSetProportional:    {id: 21, name: "TextDraw Set Proportional", actions: ["setProportional"]},
	TextDrawVisibility:         {id: 22, name: "TextDraw Visibility",       actions: ["historyVisibility"]},
	TextDrawMove:               {id: 23, name: "TextDraw Move",             actions: ["x", "y", "textSizeX", "textSizeY"]},
	TextDrawResize:             {id: 24, name: "TextDraw Resize",           actions: ["x", "y", "textSizeX", "textSizeY"]},
	TextDrawResizeLetter:       {id: 25, name: "TextDraw Resize Letter",    actions: ["x", "y", "textSizeX", "textSizeY", "letterSizeX", "letterSizeY"]},
	
	GuideGridCreate:            {id: 26, name: "GuideGrid Create",          actions: ["historyGuideGridCreate"]},
	GuideGridDuplicate:         {id: 27, name: "GuideGrid Duplicate",       actions: ["historyGuideGridCreate"]},
	GuideGridFromAnotherPoject: {id: 28, name: "GuideGrid Duplicate *",     actions: ["historyGuideGridCreate"]},
	GuideGridRemove:            {id: 29, name: "GuideGrid Remove",          actions: ["historyGuideGridRemove"]},
	GuideGridSort:              {id: 30, name: "GuideGrid Sort",            actions: ["historyGuideGridSort"]},
	GuideGridName:              {id: 31, name: "GuideGrid Name",            actions: ["name"]},
	GuideGridPosition:          {id: 32, name: "GuideGrid Position",        actions: ["x", "y"]},
	GuideGridSize:              {id: 33, name: "GuideGrid Size",            actions: ["width", "height"]},
	GuideGridMargin:            {id: 34, name: "GuideGrid Margin",          actions: ["margin"]},
	GuideGridPadding:           {id: 35, name: "GuideGrid Padding",         actions: ["padding"]},
	GuideGridRows:              {id: 36, name: "GuideGrid Rows",            actions: ["rows"]},
	GuideGridColumns:           {id: 37, name: "GuideGrid Columns",         actions: ["columns"]},
	GuideGridVisibility:        {id: 38, name: "GuideGrid Visibility",      actions: ["historyVisibility"]},
	GuideGridMove:              {id: 39, name: "GuideGrid Move",            actions: ["x", "y"]},
	GuideGridResize:            {id: 40, name: "GuideGrid Resize",          actions: ["x", "y", "width", "height"]},
	
	GuideLineCreate:            {id: 41, name: "GuideLine Create",          actions: ["historyGuideLineCreate"]},
	GuideLineDuplicate:         {id: 42, name: "GuideLine Duplicate",       actions: ["historyGuideLineCreate"]},
	GuideLineFromAnotherPoject: {id: 43, name: "GuideLine Duplicate *",     actions: ["historyGuideLineCreate"]},
	GuideLineRemove:            {id: 44, name: "GuideLine Remove",          actions: ["historyGuideLineRemove"]},
	GuideLineSort:              {id: 45, name: "GuideLine Sort",            actions: ["historyGuideLineSort"]},
	GuideLineName:              {id: 46, name: "GuideLine Name",            actions: ["name"]},
	GuideLinePosition:          {id: 47, name: "GuideLine Position",        actions: ["x", "y"]},
	GuideLineSize:              {id: 48, name: "GuideLine Size",            actions: ["size"]},
	GuideLinePadding:           {id: 49, name: "GuideLine Padding",         actions: ["padding"]},
	GuideLineStyle:             {id: 50, name: "GuideLine Style",           actions: ["style"]},
	GuideLineVisibility:        {id: 51, name: "GuideLine Visibility",      actions: ["historyVisibility"]},
	GuideLineMove:              {id: 52, name: "GuideLine Move",            actions: ["x", "y"]},
	GuideLineResize:            {id: 53, name: "GuideLine Resize",          actions: ["x", "y", "size"]},
	
	MultipleDuplicate:          {id: 54, name: "Multiple Duplicate",        actions: ["historyMultipleDuplicate", "historyRect"]},
	MultipleFromAnotherPoject:  {id: 55, name: "Multiple Duplicate *",      actions: ["historyMultipleFromAnotherPoject", "historyRect"]},
	MultipleRemove:             {id: 56, name: "Multiple Remove",           actions: ["historyMultipleRemove", "historyRect"]},
	MultiplePosition:           {id: 57, name: "Multiple Position",         actions: ["historyRect"], setSelections: true},
	MultipleSize:               {id: 58, name: "Multiple Size",             actions: ["historyRect"], setSelections: true},
	MultipleMove:               {id: 59, name: "Multiple Move",             actions: ["historyRect"], setSelections: true},
	MultipleResize:             {id: 60, name: "Multiple Resize",           actions: ["historyRect"], setSelections: true},
};

const HistoryTypeById = Object.values(HistoryType);

for(id in HistoryTypeById)
{
	if(HistoryTypeById[id].id != id)
		console.error("HistoryTypeById[" + id + "].id(" + HistoryTypeById[id].id + ") != id(" + id + ")");
}
