---
description: Silly little configurable table
---

# DataView

Silly little configurable table

---

## Usage

Pass `data` to it :)

::ComponentExample
---
is: SenpDataView
ignoreModel: true
props:
  settingsStrategy: absolute
  classes: { "wrapper": {"extend": "border border-gray-700 !max-h-96"} }
  data: [{"id":1,"username":"Carroll_Weissnat90","password":"58IKaFBMRcJTB_D"},{"id":2,"username":"Elliot0","password":"lCSfDFb7KCGkynN"},{"id":3,"username":"Zaria.Ziemann59","password":"2dvqIOchEG884HK"},{"id":4,"username":"Melvina.Von78","password":"WRC2lKuNp4VUMeG"},{"id":5,"username":"Milton_McGlynn","password":"8R9XfqcCCGDyYuX"},{"id":6,"username":"Nedra.Dicki","password":"X_jC8mHAAXYe0qX"},{"id":7,"username":"Lamont.Langworth","password":"XXhjnNf3gLHLWsz"},{"id":8,"username":"Fanny_Boyle17","password":"1mxtGIrdFyLkUMr"},{"id":9,"username":"Otis_Kemmer42","password":"87dO4gcDyyaqwy0"},{"id":10,"username":"Genoveva_Larson71","password":"qZj69iBJ4FmOgnM"},{"id":11,"username":"Murray.Monahan17","password":"5LtSM3csKBLjwIq"},{"id":12,"username":"Clarabelle56","password":"hizbXiVrS3TPFF_"},{"id":13,"username":"Carmela75","password":"JXIFodr8gnrvmdS"},{"id":14,"username":"Nikita_Schaefer65","password":"krlr8S2gVs2UREK"},{"id":15,"username":"Luna68","password":"xNpEPHNnCnc3BTD"},{"id":16,"username":"Christopher43","password":"cu9lF4Vu_EYfo1R"},{"id":17,"username":"Lillie_Orn38","password":"BwGG2CsKvXB4ph2"},{"id":18,"username":"Kylee_Wunsch","password":"SRUBGB6RhJwbLLP"},{"id":19,"username":"Justus_Ziemann89","password":"OP1m0uPocKKC6N1"},{"id":20,"username":"Velma_Pfannerstill","password":"8tYS5u9pn5xa7SM"},{"id":21,"username":"Dolores_Keeling","password":"i9eFJikZ7vbGvw_"},{"id":22,"username":"Conrad9","password":"YTmULJTcrLpgcGG"},{"id":23,"username":"Buddy_Stoltenberg38","password":"stAzNSHSuFhEbQj"},{"id":24,"username":"Neil25","password":"5fO2C8iZ5dxcGBC"},{"id":25,"username":"Raleigh.Little","password":"_Cqi38uB5f5MP5u"},{"id":26,"username":"Brandy_Casper","password":"shYdyzfhge7nkQn"},{"id":27,"username":"Paul_Rippin","password":"RyvRUX7vjXaes_p"},{"id":28,"username":"Trycia99","password":"YGINP8YQy94gAAW"},{"id":29,"username":"Briana_Leannon","password":"UCg6SiE1cgBbY0N"},{"id":30,"username":"Lilyan.Rau79","password":"E78bbQkBZ73BX1e"},{"id":31,"username":"Scot_Koch","password":"O7D_r5sWbYDVWct"},{"id":32,"username":"Gregoria_Emmerich27","password":"82xIhQkGAcPz6CQ"},{"id":33,"username":"Celestine.McLaughlin28","password":"UefQ6h8_XziNY7g"},{"id":34,"username":"Dayne55","password":"fdMMM5GYWgse59Q"},{"id":35,"username":"Reagan97","password":"mhrFtZHokkveDni"},{"id":36,"username":"Kylee_Torphy","password":"6N45e0jgYZEU0S8"},{"id":37,"username":"Melvina75","password":"PXUZNGM4eYQFwmN"},{"id":38,"username":"Alda_Douglas97","password":"7ScY3QjIYTYrHYe"},{"id":39,"username":"Harmony_Conn17","password":"Up7ELqOKibSpRRw"}]
---
:: 

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-data-view
initialControls:
  settingsStrategy: absolute
  queryKeyPrefix: auto
  limitTo: 100
  classes: { "wrapper": {"extend": "border border-gray-700 !max-h-96"} }
  initialFilters: []
  initialSorters: []
  initialSettings: [{"label":"id","key":"id","order":1,"size":"sm","visible":true,"style":"muted","as":"list","span":"1","labelSide":"left"},{"label":"username","key":"username","order":2,"size":"sm","visible":true,"style":"standard","as":"cell","span":"1","labelSide":"top"},{"label":"password","key":"password","order":3,"size":"sm","visible":true,"style":"standard","as":"cell","span":"1","labelSide":"top"}]
  initialState: { "settingsOpen": false, "cellSpacing": "auto", "cellGap": "sm", "tagPosition": "top", "limit": "10" }
  data: [{"id":1,"username":"Carroll_Weissnat90","password":"58IKaFBMRcJTB_D"},{"id":2,"username":"Elliot0","password":"lCSfDFb7KCGkynN"},{"id":3,"username":"Zaria.Ziemann59","password":"2dvqIOchEG884HK"},{"id":4,"username":"Melvina.Von78","password":"WRC2lKuNp4VUMeG"},{"id":5,"username":"Milton_McGlynn","password":"8R9XfqcCCGDyYuX"},{"id":6,"username":"Nedra.Dicki","password":"X_jC8mHAAXYe0qX"},{"id":7,"username":"Lamont.Langworth","password":"XXhjnNf3gLHLWsz"},{"id":8,"username":"Fanny_Boyle17","password":"1mxtGIrdFyLkUMr"},{"id":9,"username":"Otis_Kemmer42","password":"87dO4gcDyyaqwy0"},{"id":10,"username":"Genoveva_Larson71","password":"qZj69iBJ4FmOgnM"},{"id":11,"username":"Murray.Monahan17","password":"5LtSM3csKBLjwIq"},{"id":12,"username":"Clarabelle56","password":"hizbXiVrS3TPFF_"},{"id":13,"username":"Carmela75","password":"JXIFodr8gnrvmdS"},{"id":14,"username":"Nikita_Schaefer65","password":"krlr8S2gVs2UREK"},{"id":15,"username":"Luna68","password":"xNpEPHNnCnc3BTD"},{"id":16,"username":"Christopher43","password":"cu9lF4Vu_EYfo1R"},{"id":17,"username":"Lillie_Orn38","password":"BwGG2CsKvXB4ph2"},{"id":18,"username":"Kylee_Wunsch","password":"SRUBGB6RhJwbLLP"},{"id":19,"username":"Justus_Ziemann89","password":"OP1m0uPocKKC6N1"},{"id":20,"username":"Velma_Pfannerstill","password":"8tYS5u9pn5xa7SM"},{"id":21,"username":"Dolores_Keeling","password":"i9eFJikZ7vbGvw_"},{"id":22,"username":"Conrad9","password":"YTmULJTcrLpgcGG"},{"id":23,"username":"Buddy_Stoltenberg38","password":"stAzNSHSuFhEbQj"},{"id":24,"username":"Neil25","password":"5fO2C8iZ5dxcGBC"},{"id":25,"username":"Raleigh.Little","password":"_Cqi38uB5f5MP5u"},{"id":26,"username":"Brandy_Casper","password":"shYdyzfhge7nkQn"},{"id":27,"username":"Paul_Rippin","password":"RyvRUX7vjXaes_p"},{"id":28,"username":"Trycia99","password":"YGINP8YQy94gAAW"},{"id":29,"username":"Briana_Leannon","password":"UCg6SiE1cgBbY0N"},{"id":30,"username":"Lilyan.Rau79","password":"E78bbQkBZ73BX1e"},{"id":31,"username":"Scot_Koch","password":"O7D_r5sWbYDVWct"},{"id":32,"username":"Gregoria_Emmerich27","password":"82xIhQkGAcPz6CQ"},{"id":33,"username":"Celestine.McLaughlin28","password":"UefQ6h8_XziNY7g"},{"id":34,"username":"Dayne55","password":"fdMMM5GYWgse59Q"},{"id":35,"username":"Reagan97","password":"mhrFtZHokkveDni"},{"id":36,"username":"Kylee_Torphy","password":"6N45e0jgYZEU0S8"},{"id":37,"username":"Melvina75","password":"PXUZNGM4eYQFwmN"},{"id":38,"username":"Alda_Douglas97","password":"7ScY3QjIYTYrHYe"},{"id":39,"username":"Harmony_Conn17","password":"Up7ELqOKibSpRRw"}]
---
::