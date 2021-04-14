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
        max = this.max();
        min = this.min();
        if (x !== max&& x !==min){
            return x;
        }else if (y !== max&&y!==min){
            return y;
        }else return z;
    }


}