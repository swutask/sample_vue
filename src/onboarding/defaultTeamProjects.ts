// first book
/* eslint-disable */
export const first = (images = {}) => {
  return `
<p><span type="emoji"
data="👋">👋</span> Welcome to Complex.</p>
<p></p>
<div type="block-color" style="background-color: #F8F8F8" class="color-block">Easily jot down notes, whether they're quick thoughts or detailed pieces of text.</div>
<p></p>
<p></p>
<h2>Good to know</h2>
<ul data-type="todo_list" class="todo_list">
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>You're currently looking at a <strong>note</strong>, you can create a new note by using the "+" button on top of the notes sidebar on the left.</p>
  </li>
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>To tidy up your notes in the sidebar, just drag and drop them. And if you want to rename a note, simply edit the title right here in the note itself.</p>
  </li>
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>You can also nest notes to create a neater and more organized workspace.</p>
  </li>
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>Use "@" to refer to any task or other note.</p>
  </li>
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>All your notes are saved instantly and automatically.</p>
  </li>
</ul>
<p></p>
<p></p>
<h2>Images</h2>
<p><span type="image" src="${images['first.jpg']?.url}"  id="${images['first.jpg']?.id}"
     style="width: 43%; position: relative; display: inline-block;
                line-height: 0; vertical-align: text-bottom; max-width: 98%; min-width: 100px" class="shadow-smooth"
    ischateditor="false" contenteditable="false"><span contenteditable="false"></span><span
      contenteditable="false"></span><span contenteditable="false"></span><img
      src="${images['first.jpg']?.url}"  id="${images['first.jpg']?.id}" style="width: 43%; position: relative; display: inline-block;
                line-height: 0; vertical-align: text-bottom; max-width: 98%; min-width: 100px" class="shadow-smooth"
      ischateditor="false"></span>
  <span type="image"
  src="${images['second.jpg']?.url}"  id="${images['second.jpg']?.id}" style="width: 45%; position: relative; display: inline-block;
      line-height: 0; vertical-align: text-bottom; max-width: 98%; min-width: 100px" class="shadow-smooth"
    contenteditable="false"><span contenteditable="false"></span><span contenteditable="false"></span><span
      contenteditable="false"></span><img
      src="${images['second.jpg']?.url}"  id="${images['second.jpg']?.id}" style="width: 45%; position: relative; display: inline-block;
      line-height: 0; vertical-align: text-bottom; max-width: 98%; min-width: 100px" class="shadow-smooth"></span></p>
<p><em>Double-click on images to open the image, comment, annotate and view more options.</em></p>
<p></p>
<p></p>
<h3><strong>Tips & tricks:</strong></h3>
<ul data-type="todo_list" class="todo_list">
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>Select text to <a target="_blank" rel="noopener noreferrer nofollow" href="https://complex.so/">
    create links</a>, change text color, highlight text and more...</p>
  </li>
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>Use ":" to insert emoji's
      <span type="emoji" data="😁">😁</span>
      <span type="emoji" data="😎">😎</span>
      <span type="emoji" data="💯">💯</span>
    </p>
  </li>
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>Hit the share button in the top right corner to easily share your notes with anyone, even if they're not part of your workspace.</p>
  </li>
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>Click on a blank line to open the editor's toolbar.</p>
  </li>
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>Use the share menu in the top right corner to share your notes with anyone, even people who are not part of your workspace.</p>
  </li>
</ul>
<p></p>
<p>There's a lot more to it.</p>
<p>Give Complex.so a shot and see for yourself <span type="emoji" data="👀">👀</span>!</p>
<p><em>The Complex team.</em></p>
<p></p>
<p></p>
<p><span type="image" src="${images['third.png']?.url}"  id="${images['third.png']?.id}" style="width: 49%; position: relative; display: inline-block;
                line-height: 0; vertical-align: text-bottom; max-width: 98%; min-width: 100px" class=""
    ischateditor="false" contenteditable="false"><span contenteditable="false"></span><span
      contenteditable="false"></span><span contenteditable="false"></span><img
      src="${images['third.png']?.url}"  id="${images['third.png']?.id}" style="width: 49%; position: relative; display: inline-block;
                line-height: 0; vertical-align: text-bottom; max-width: 98%; min-width: 100px" class=""
      ischateditor="false"></span></p>
<p></p>
<p></p>
<p></p>
<p></p>
  `
}

// export const second = () => {
//   return `
//   <p><em>Shared with developers.</em></p>
//   <p></p>
//   <p>We should NOT forget to add this snippet to the &lt;header&gt; of each page. This is our analytics snippet that will
//     track all website stats.</p>
//   <p></p>
//   <pre><code>&lt;script&gt;
//     window.dataLayer = window.dataLayer || [];
//     function gtag(){dataLayer.push(arguments);}
//     gtag('js', new Date());

//     gtag('config', 'UA-4237343656-1', { 'optimize_id': 'GTM-M7%sf3213'});
//     gtag('config', 'AW-232472344');
//   &lt;/script&gt;</code></pre>
//   <p></p>
//   <p></p>
// `
// }

export const third = (bookId?: number, project1?: number, project2?: number) => {
  return `
    <p>All our meeting recaps.</p>
    <p></p>
    <h4>Overview of most recent meetings:</h4>
    <p>Upcoming meeting: <em>no date yet</em></p>
    <p>12 September meeting:
     <button class="mention" href="/space/${bookId}?page=${project2}" title="12 sept">@12 sept</button></p>
    <p>5 September meeting:<strong> </strong>
    <button class="mention" href="/space/${bookId}?page=${project1}" title="5 sept">@5 sept</button></p>
    <p></p>
  `
}

export const fourth = () => {
  return `
<p>Meeting notes of <u>September 5th</u>.</p>
<p></p>
<h3><span type="emoji" data="🗒">🗒</span><strong> Meeting agenda:</strong></h3>
<ul>
  <li isevent="false" class="list-item select-none" id="0.42696387160855354">
    <div class="list-item-content">
      <p>Strategy for the 4th Quarter.</p>
      <ul>
        <li isevent="false" class="list-item select-none" id="0.42696387160855354">
          <div class="list-item-content">
            <p>Marketing budget should be decreased by 30% (low-season)</p>
          </div>
        </li>
        <li isevent="false" class="list-item select-none" id="0.42696387160855354">
          <div class="list-item-content">
            <p>Search for new office space </p>
          </div>
        </li>
        <li isevent="false" class="list-item select-none" id="0.42696387160855354">
          <div class="list-item-content">
            <p>The new CFO. What are we looking for?</p>
          </div>
        </li>
        <li isevent="false" class="list-item select-none" id="0.42696387160855354">
          <div class="list-item-content">
            <p>Q3 revenue review</p>
          </div>
        </li>
      </ul>
    </div>
  </li>
  <li isevent="false" class="list-item select-none" id="0.594968366568998">
    <div class="list-item-content">
      <p>New employee perks</p>
    </div>
  </li>
</ul>
<p></p>
<h3><span type="emoji" data="✔️">✔️</span> Action Items:</h3>
<ul data-type="todo_list" class="todo_list">
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>Calculate new marketing budget <span style="color: rgb(95, 95, 255)" type="color">@AnitaOakley</span></p>
  </li>
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>Write CFO job description <span style="color: rgb(95, 95, 255)" type="color">@BernardWilson</span></p>
  </li>
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p><span style="color: rgb(95, 95, 255)" type="color">@JamesJohnsen, </span>go to office viewing instead of <span
        style="color: #3F40F2" type="color">@ErinHunt </span>on monday 13:45PM.</p>
  </li>
</ul>
<p></p>
<h3>Not resolved:</h3>
<ul>
  <li isevent="false" class="list-item select-none" id="0.7679096264229792">
    <div class="list-item-content">
      <p>The Q3 revenue review has been moved to next week's meeting. </p>
    </div>
  </li>
</ul>
<p></p>
<p></p>
<p></p>
<p></p>
  `
}

export const fifth = () => {
  return `
<p>Meeting notes of <u>September 12th</u>.</p>
<p></p>
<div type="block-color" style="background-color: #F8F8F8" class="color-block">💡 Meeting was held via Zoom, <span
    style="color: #3F40F2" type="color">@KimLangley</span> did not attend due to illness.</div>
<p></p>
<h3><span type="emoji" data="🗒">🗒</span><strong> Meeting agenda:</strong></h3>
<ul>
  <li isevent="false" class="list-item select-none" id="0.182573569677275">
    <div class="list-item-content">
      <p>Q3 Revenue review</p>
    </div>
  </li>
  <li isevent="false" class="list-item select-none" id="0.182573569677275">
    <div class="list-item-content">
      <p>Yearly company event to Mallorca</p>
    </div>
  </li>
  <li isevent="false" class="list-item select-none" id="0.182573569677275">
    <div class="list-item-content">
      <p>Long-term growth strategy</p>
    </div>
  </li>
</ul>
<p></p>
<h3><span type="emoji" data="✔️">✔️</span> Action Items:</h3>
<ul data-type="todo_list" class="todo_list">
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>Hire a new office manager <span style="color: rgb(95, 95, 255)" type="color">@AnitaOakley</span></p>
  </li>
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>Book Mallorca trip for all 42 team members <span style="color: rgb(95, 95, 255)"
        type="color">@PatrickCardoso</span></p>
  </li>
  <li class="todo_item todo_item" isevent="false" data-done="false" data-type="todo_item">
    <p>Create list with items to increase revenue for Q4 <span style="color: rgb(95, 95, 255)"
        type="color">@FinnMusk</span></p>
  </li>
</ul>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
  `
}


export const sixth = (images = {}) => {
  return `
  <p><strong>Client:</strong> WizardWorks - Space Moonshine <span type="emoji" data="🌕">🌕</span> </p>
  <p><strong>Date:</strong> July 12th, 2029</p>
  <p></p>
  <p><strong>Space Overview:</strong> The purpose of this space is to create a website for Wizard Works. The design
    should reflect the client’s brand identity and resonate with their target audience, which primarily consists of
    innovators.</p>
  <p></p>
  <p><span type="image"
  src="${images['first.jpg']?.url}"  id="${images['first.jpg']?.id}" style="width: 64%;" class="" contenteditable="false"><span contenteditable="false"></span><span
        contenteditable="false"></span><span contenteditable="false"></span><img
        src="${images['first.jpg']?.url}"  id="${images['first.jpg']?.id}" style="width: 64%;" class=""></span></p>
  <p></p>
  <p><strong>Objectives:</strong></p>
  <ol start="[object Object]">
    <li class="ordered-list-item">
      <div class="ordered-list-item-content">
        <p>To develop a visually appealing and functional website + intro movie.</p>
      </div>
    </li>
    <li class="ordered-list-item">
      <div class="ordered-list-item-content">
        <p>To effectively communicate the client’s brand message.</p>
      </div>
    </li>
    <li class="ordered-list-item">
      <div class="ordered-list-item-content">
        <p>To improve user engagement and experience.</p>
      </div>
    </li>
  </ol>
  <p></p>
  <p><strong>Design Requirements:</strong></p>
  <ul>
    <li data-type="listItem">
      <p><strong>Style and Tone:</strong> The design should convey a modern, abstract feel.</p>
    </li>
    <li data-type="listItem">
      <p><strong>Color Scheme:</strong> Preferably use orange and blue.</p>
    </li>
    <li data-type="listItem">
      <p><strong>Typography:</strong> Utilize <em>Klimate Mono</em> as the font-family.</p>
    </li>
    <li data-type="listItem">
      <p><strong>Imagery:</strong> Incorporate high-quality images that are relevant to the content and audience.</p>
    </li>
    <li data-type="listItem">
      <p><strong>Layout:</strong> Ensure the layout is user-friendly, with a clear hierarchy and easy navigation.</p>
      <p></p>
    </li>
  </ul>
  <p><strong>Deliverables:</strong></p>
  <ol start="[object Object]">
    <li class="ordered-list-item">
      <div class="ordered-list-item-content">
        <p>Initial design concepts by July 12th.</p>
      </div>
    </li>
    <li class="ordered-list-item">
      <div class="ordered-list-item-content">
        <p>Revisions based on feedback.</p>
      </div>
    </li>
    <li class="ordered-list-item">
      <div class="ordered-list-item-content">
        <p>Final design files in August.</p>
        <p></p>
      </div>
    </li>
  </ol>
  <p><strong>Budget:</strong> The budget for this project is $16,000.</p>
  <p></p>
  <p><strong>Additional Notes:</strong> Avoid the words &quot;fruit&quot; and &quot;food&quot;. </p>
  <p></p>
  `
}
