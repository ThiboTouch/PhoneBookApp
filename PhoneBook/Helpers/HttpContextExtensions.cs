﻿using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhoneBook.Helpers
{
    public static class HttpContextExtensions
    {
        public async static Task InsertPaginationParametersInResponse<T>(this HttpContext httpContext,
            IQueryable<T> queryable, int recordsPerPage)
        {
            if(httpContext == null) { throw new ArgumentNullException(nameof(httpContext)); }

            double count = await queryable.CountAsync();
            double totalAmountPages = Math.Ceiling(count / recordsPerPage);
            httpContext.Response.Headers.Add("totalAmountPages", totalAmountPages.ToString());
            httpContext.Response.Headers.Add("totalItems", count.ToString());
            httpContext.Response.Headers.Add("Access-Control-Expose-Headers", "totalItems, totalAmountPages");
        }
    }
}
