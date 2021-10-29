class CommentModel {
    constructor(id, type){
        this.container = document.getElementById(id);
        this.type = type;
    }
  getAllComments() {
        return JSON.parse(localStorage.getItem(this.type)) || [];
      }
      
       renderCommentList(key){
           this.container.innerHTML = "";
           let commentsToRender;
           if(key){
               commentsToRender = this.filterCommentsByName(key);
           }else{
               commentsToRender = this.getAllComments();
           }
        commentsToRender.forEach(comment => {
          const item = document.createElement("li");
          item.innerHTML = comment.content;
          this.container.appendChild(item);
        });
      }
    
     filterCommentsByName(name){
       return this.getAllComments().filter(comment => comment.name === name);
      }

      addComments(text, key){
          const comments = this.getAllComments();
        comments.push({
            type: this.type,
            name: key,
            date: new Date(),
            content: text
          });
          localStorage.setItem(this.type, JSON.stringify(comments));
      }
}

export default CommentModel;