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

    draw(ctx){
        for(const seg of this.segment){
            seg.draw(ctx);
        }

        for(const point of this.points){
            point.draw(ctx);
        }
    }
}