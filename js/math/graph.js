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

    draw(ctx){
        for(const seg of this.segment){
            seg.draw(ctx);
        }

        for(const point of this.points){
            point.draw(ctx);
        }
    }
}