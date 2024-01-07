class Graph{
    constructor(points = [], segment = []){
        this.segment = segment;
        this.points = points;
    }

    addPoint(point){
        this.points.push(point);
    }

    containsPoint(point){
        return this.points.find((p) => p.equals(point));
    }

    tryAddPoint(point){
        if(!this.containsPoint(point)){
            this.addPoint(point);
            return true;
        }
        return false;
    }

    addSegment(seg){
        this.segment.push(seg);
    }

    containsSegment(seg){
        return this.segment.find((s)=>s.equals(seg));
    }

    tryAddSegment(seg){
        if(!this.containsSegment(seg)){
            this.addSegment(seg);
            return true; 
        }
        return false; 
    }

    removeSegment(seg){
        this.segment.splice(this.segment.indexOf(seg),1);
    }

    removePoint(point){
        const segs = this.getSegmentsWithPoint(point);
        for(const seg of segs){
            this.removeSegment(seg);
        }
        this.points.splice(this.points.indexOf(point),1);
    }

    getSegmentsWithPoint(point){
        const segs = [];
        for(const seg of this.segment){
            if(seg.includes(point)){
                segs.push(seg);
            }
        }
        return segs;
    }

    dispose(){
        this.points.length=0;
        this.segment.length=0;
    }

    draw(ctx){
        for(const seg of this.segment){
            seg.draw(ctx);
        }

        for(const point of this.points){
            point.draw(ctx);
        }
    }
}