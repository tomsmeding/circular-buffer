function CircularBuffer(capacity){
	if(!(this instanceof CircularBuffer))return new CircularBuffer(capacity);
	if(typeof capacity!="number"||capacity%1!=0||capacity<1)
		throw new TypeError("Invalid capacity");
	var buffer=new Array(capacity),first=capacity-1,size=0;
	this.size=function(){return size;};
	this.capacity=function(){return capacity;};
	this.enq=function(value){
		if(first>0)first--; else first=capacity-1;
		buffer[first]=value;
		if(size<capacity)size++;
	};
	this.deq=function(){
		if(size==0)throw new RangeError("CircularBuffer dequeue on empty buffer");
		var value=buffer[first];
		if(first==capacity-1)first=0; else first++;
		size--;
		return value;
	};
	this.get=function(start,end){
		if(size==0&&start==0&&(end==undefined||end==0))return [];
		if(typeof start!="number"||start%1!=0||start<0)throw new TypeError("Invalid start");
		if(start>=size)throw new RangeError("Index past end of buffer: "+start);

		if(end==undefined)return buffer[(first+start)%capacity];

		if(typeof end!="number"||end%1!=0||end<0)throw new TypeError("Invalid end");
		if(end>=size)throw new RangeError("Index past end of buffer: "+end);

		var res=[],i;
		for(i=start;i<=end;i++)res.push(buffer[(first+i)%capacity]);
		return res;
	};
	this.toarray=function(){
		if(size==0)return [];
		return this.get(0,size-1);
	}
}

module.exports=CircularBuffer;
