using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductApi.Models
{
    public class ProductContext : DbContext
    {
       public DbSet<Product> Products { get; set; }

        public ProductContext(DbContextOptions<ProductContext> options) : base(options) { }
    }
}
