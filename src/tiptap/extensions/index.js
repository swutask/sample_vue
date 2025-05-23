import { ColorBlock } from './ColorBlock'
import { LocalLink } from './LocalLink'
import { Mention } from './Mention'
import { Emoji } from './Emoji'
import { Image } from './Image'
import { File } from './File'
import { ImageChat } from './ImageChat'
import { Gif } from './Gif'
import { Placeholder } from './Placeholder'
import { ListItem } from './ListItem'
import { TaskItem } from './TaskItem'
import { TaskList } from './TaskList'
import { TextColor } from './TextColor'
// import { TrailingNode } from './TrailingNode'
import { Doc } from './Doc'
import { DocTitle } from './DocTitle'
import { CommentMark } from './CommentMark'
import { Scroll } from './Scroll'
import { Table } from './Table'
import { Indent } from './Indent'
import { Paragraph } from './Paragraph'
import { Heading } from './Heading'
import { Typography } from './Typography'
import { ChatDocument } from './Chat'
import { OrderedList } from './OrderedList'
import { OrderedListItem } from './OrderedListItem'
import { ImageChatEmoji } from './ImageChatEmoji'
import { Link } from './Link'
import { SearchNHighlight } from './SearchNHighlight'
import { Youtube } from './YouTube'

import BulletList from '@tiptap/extension-bullet-list'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Italic from '@tiptap/extension-italic'
// import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
// import OrderedList from '@tiptap/extension-ordered-list'
import Underline from '@tiptap/extension-underline'
import Text from '@tiptap/extension-text'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
// import Document from '@tiptap/extension-document'
import History from '@tiptap/extension-history'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

const loadLowLight = () => import('lowlight')

export const defaultExtensions = async (options) => {
  const { lowlight } = await loadLowLight()

  return [
    CommentMark,
    Indent,
    SearchNHighlight,

    Dropcursor.configure(options?.dropcursor),
    Gapcursor,
    Paragraph,
    Text,
    Bold.configure(options?.bold),
    Italic.configure(options?.italic),
    CodeBlockLowlight.configure({ lowlight }),
    HardBreak.configure(options?.hardBreak),
    HorizontalRule.configure(options?.horizontalRule),
    BulletList.configure(options?.bulletList),
    OrderedList.configure(options?.orderedList),
    OrderedListItem.configure(options?.orderedListItem),
    Highlight.configure(options?.highlight),
    Youtube.configure(options?.youtube),
    // History.configure(options?.history),
    Typography,

    Doc,
    // custom extensions
    Blockquote,
    Heading,
    TextColor,
    // TrailingNode,
    Placeholder,
    ColorBlock,
    Underline,
    ListItem.configure(options?.listItem),
    Link,
    LocalLink,
    Mention.configure(options?.mention),
    Emoji.configure(options?.emoji),
    Image.configure(options?.image),
    File.configure(options?.file),
    Gif,
    TaskItem.configure(options?.taskItem),
    TaskList,
    // Title,
    Scroll,
    Table,
    TableRow,
    TableCell,
    TableHeader
  ]
}

export const chatExtensions = (options) => {
  return [
    Youtube.configure(options?.youtube),

    ChatDocument.configure(options?.chat),
    SearchNHighlight,
    Indent,
    // default extensions
    Dropcursor.configure(options?.dropcursor),
    // Gapcursor,
    // custom extension
    Paragraph,
    HardBreak.configure(options?.hardBreak),
    Text,
    Bold.configure(options?.bold),
    Italic.configure(options?.italic),
    HorizontalRule.configure(options?.horizontalRule),
    BulletList.configure(options?.bulletList),
    OrderedList.configure(options?.orderedList),
    OrderedListItem.configure(options?.orderedListItem),
    Highlight.configure(options?.highlight),
    History.configure(options?.history),
    Typography,

    // custom extensions
    Blockquote,
    Heading,
    TextColor,
    Placeholder,
    ColorBlock,
    Underline,
    ListItem.configure(options?.listItem),
    Link,
    LocalLink,
    Mention.configure(options?.mention),
    Emoji.configure(options?.emoji),
    ImageChat.configure(options?.image),
    Gif,
    ImageChatEmoji,
    TaskItem.configure(options?.taskItem),
    TaskList
  ]
}

export const titleExtensions = (options) => {
  return [
    Doc.configure(options?.doc),
    SearchNHighlight,
    Paragraph,
    Text,
    Bold.configure(options?.bold),
    Italic.configure(options?.italic),
    History.configure(options?.history),
    Placeholder,
    Underline,
    Link,
    LocalLink,
    Mention.configure(options?.mention),
    Emoji.configure(options?.emoji),
    ImageChatEmoji
  ]
}

export const pageTitleExtensions = (options) => {
  return [
    DocTitle.configure(options?.doc),
    SearchNHighlight,
    Paragraph,
    Text,
    Bold.configure(options?.bold),
    Italic.configure(options?.italic),
    History.configure(options?.history),
    Placeholder,
    Underline,
    Link,
    LocalLink,
    Mention.configure(options?.mention),
    Emoji.configure(options?.emoji),
    ImageChatEmoji
  ]
}

export const taskContentExtensions = async (options) => {
  const { lowlight } = await loadLowLight()

  return [
    SearchNHighlight,
    Indent,
    // default extensions
    Dropcursor.configure(options?.dropcursor),
    // Gapcursor,
    // custom extension
    Paragraph,
    Text,
    Bold.configure(options?.bold),
    Italic.configure(options?.italic),
    CodeBlockLowlight.configure({ lowlight }),
    HardBreak.configure(options?.hardBreak),
    HorizontalRule.configure(options?.horizontalRule),
    BulletList.configure(options?.bulletList),
    OrderedList.configure(options?.orderedList),
    OrderedListItem.configure(options?.orderedListItem),
    Highlight.configure(options?.highlight),
    Youtube.configure(options?.youtube),
    Typography,

    // custom extensions
    Blockquote,
    Heading,
    TextColor,
    // TrailingNode,
    Placeholder,
    ColorBlock,
    Underline,
    ListItem.configure(options?.listItem),
    Link,
    LocalLink,
    Mention.configure(options?.mention),
    Emoji.configure(options?.emoji),
    Image.configure(options?.image),
    File.configure(options?.file),
    Gif,
    TaskItem.configure(options?.taskItem),
    TaskList,
    Doc,
    Table,
    TableRow,
    TableHeader,
    TableCell
  ]
}
