class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;
        this.selected= null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = null;

        this.ctx = this.canvas.getContext("2d");

        this.#addEventListeners();
    }

    #addEventListeners(){
        this.canvas.addEventListener("mousedown", (evt) => {
            if(evt.button == 2){
                if(this.selected){
                    this.selected=null;
                }else if(this.hovered){
                    this.#removePoint(this.hovered);
                }
            }

            if(evt.button == 0){
                this.mouse = new Point(evt.offsetX, evt.offsetY);
                if(this.hovered){
                    if(this.selected){
                        this.graph.tryAddSegment(new Segment(this.selected, this.hovered));
                    }
                    this.selected = this.hovered;
                    this.dragging = true;
                    return;
                }
                this.graph.addPoint(this.mouse);
                if(this.selected){
                    let success = this.graph.tryAddSegment(new Segment(this.selected, this.mouse));
                }
                this.selected = this.mouse;
                this.hovered = this.mouse;
                
            }
            
        });

        this.canvas.addEventListener("mousemove", (evt) => {
            this.mouse = new Point(evt.offsetX, evt.offsetY);
            this.hovered = getNearestPoint(this.mouse, this.graph.points);
            if(this.dragging){
                this.selected.x = this.mouse.x;
                this.selected.y = this.mouse.y;
            }
        });

        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
        this.canvas.addEventListener("mouseup", () => this.dragging=false);
    }

    #removePoint(point){
        this.graph.removePoint(point);
        this.hovered = null;
        if(this.selected == point){
            this.selected = null;
        }
        
    }

    display() {
        this.graph.draw(this.ctx);
        if(this.hovered){
            this.hovered.draw(this.ctx, {fill: true})
        }

        if(this.selected){
            const intent = this.hovered ? this.hovered:this.mouse;
            new Segment(this.selected, intent).draw(ctx, {dash: [3,3] });
            this.selected.draw(this.ctx, {outline: true})
        }
    }
}