import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { RiHome5Line } from 'react-icons/ri';

const Sidebar = () =>
  S.list()
    .title(`Slick's Slices`)
    .items([
      S.listItem()
        .title('Home Page')
        .icon(() => <RiHome5Line />)
        .child(S.editor().schemaType('storeSettings').documentId('downtown')),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);

export default Sidebar;