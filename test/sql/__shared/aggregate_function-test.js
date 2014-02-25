var should = require('should');
var Store = require('../../../lib/store');


module.exports = function(title, beforeFn, afterFn, store_conf){
  
  describe(title + ': Aggregate Functions', function(){
    var store;
  
    before(beforeFn);
    after(afterFn);
  
  
    before(function(){
      store = new Store(store_conf);
      store.setMaxListeners(0);

      store.Model('User', function(){});
    });
  
        
  
  
    describe('count()', function(){
      it('returns the right sql', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.count('salary').toSql().should.be.equal('select count("salary") as "count" from "users"');
          next();
        });      
      });
    
      it('returns the right result', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.count('salary').exec(function(result){
            result.count.should.be.equal(5);
            next();
          });
        });      
      });
    
      it('returns the right result without a param (*)', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.count().exec(function(result){
            result.count.should.be.equal(5);
            next();
          });
        });      
      });
    
      it('works with conditions', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.count('salary').where({salary_gt: 500}).exec(function(result){
            result.count.should.be.equal(1);
            next();
          });
        });      
      });
    });
  
  
  
    describe('sum()', function(){
      it('returns the right sql', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.sum('salary').toSql().should.be.equal('select sum("salary") as "sum" from "users"');
          next();
        });      
      });
    
      it('returns the right result', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.sum('salary').exec(function(result){
            result.sum.should.be.equal(2000);
            next();
          });
        });      
      });
    
      it('works with conditions', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.sum('salary').where({salary_gt: 500}).exec(function(result){
            result.sum.should.be.equal(1000);
            next();
          });
        });      
      });
    });
  
  
  
    describe('max()', function(){
      it('returns the right sql', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.max('salary').toSql().should.be.equal('select max("salary") as "max" from "users"');
          next();
        });      
      });
    
      it('returns the right result', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.max('salary').exec(function(result){
            result.max.should.be.equal(1000);
            next();
          });
        });      
      });
    
      it('works with conditions', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.max('salary').where({salary_gt: 500}).exec(function(result){
            result.max.should.be.equal(1000);
            next();
          });
        });      
      });
    });
  
  
  
    describe('min()', function(){
      it('returns the right sql', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.min('salary').toSql().should.be.equal('select min("salary") as "min" from "users"');
          next();
        });      
      });
    
      it('returns the right result', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.min('salary').exec(function(result){
            result.min.should.be.equal(100);
            next();
          });
        });      
      });
    
      it('works with conditions', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.min('salary').where({salary_gt: 500}).exec(function(result){
            result.min.should.be.equal(1000);
            next();
          });
        });      
      });
    });
  
  
    /* not yet supported by knex
    describe('avg()', function(){
      it('returns the right sql', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.avg('salary').toSql().should.be.equal('select avg("salary") as "avg" from "users"');
          next();
        });      
      });
    
      it('returns the right result', function(next){
        store.ready(function(){
          var User = store.Model('User');
          User.avg('salary').exec(function(result){
            result.avg.should.be.equal(400);
            next();
          });
        });      
      });
    });
    */
  
  });
  
};