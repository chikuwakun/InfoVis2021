class Vec3
{
    constructor(x,y,z) {
        this.x =x;
        this.y =y;
        this.z=z;
    }
    min(){
           var tmp = x;
           if (tmp > y) {
               tmp = y;
           }
           if (tmp > z){
               tmp = z;
           }

           return tmp;
    }

    max() {
        var tmp = x;
        if (tmp < y) {
            tmp = y;
        }
        if (tmp < z){
            tmp = z;
        }

        return tmp;
    }

    mid(){
        var max = this.max();
        var min = this.min();
        if (x !== max&& x !==min){
            return x;
        }else if (y !== max&&y!==min){
            return y;
        }else return z;
    }

    text(){
        var min  = v.min();
        var mid = v.mid();
        var max = v.max();

        var text;

        text = min+ " is min.\n" + mid + " is mid.\n" + max + " is max.\n";
        return text;
    }

    static dist(v1,v2){
        return Math.sqrt(Math.pow(v1.x-v2.x,2)+ Math.pow(v1.y - v2.y,2)+Math.pow(v1.z- v2.z,2));
    }

    static sabun (a,b){
        return  new Vec3(a.x - b.x, a.y - b.y, a.z -b.z);
    }

    static naiseki(a,b){
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    static AreaOfTriangle(v1,v2,v3){
        var a = Vec3.sabun(v1,v2);
        var b = Vec3.sabun(v2,v3);
        console.log(a);
        console.log(b);

        return (Math.sqrt(Math.pow(this.dist(v1,v2),2) + Math.pow(this.dist(v2,v3),2) - this.naiseki(a,b))/2);

    }


}